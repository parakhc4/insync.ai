# server/generate_meal.py
import sys
import json
import time
import re
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
MONSTER_API_KEY = os.getenv("MONSTER_API_KEY")

LLM_NAME = "Meta-Llama"
MONSTER_MODEL_MAP = {
    "Google-Gemma": "google/gemma-2-9b-it",
    "Mistral": "mistralai/Mistral-7B-Instruct-v0.2",
    "Microsoft-Phi": "microsoft/Phi-3-mini-4k-instruct",
    "Meta-Llama": "meta-llama/Meta-Llama-3.1-8B-Instruct",
}

def extract_json_block(text):
    match = re.search(r"```json\s*(\{.*?\})\s*```", text, re.DOTALL)
    if match:
        try:
            json.loads(match.group(1))
            return match.group(1)
        except json.JSONDecodeError:
            return None
    return None

def setup_monster_api():
    return OpenAI(
        base_url="https://llm.monsterapi.ai/v1/",
        api_key=MONSTER_API_KEY,
    )

def call_monster_api(user_input, context, client, retries=3, wait_time=5):
    attempt = 0
    while attempt < retries:
        try:
            response = client.chat.completions.create(
                model=MONSTER_MODEL_MAP[LLM_NAME],
                messages=[
                    {"role": "system", "content": context},
                    {"role": "user", "content": user_input},
                ]
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            print("🛑 Error during API call:", str(e), file=sys.stderr)
            if "429" in str(e):
                time.sleep(wait_time)
                attempt += 1
            else:
                break
    return "Could not generate a response."

def main():
    if len(sys.argv) < 2:
        print("❌ Usage: python3 generate_meal.py \"Indian,Chinese\"", file=sys.stderr)
        sys.exit(1)

    cuisines = sys.argv[1].split(",")
    prompt = (
        f"You are a helpful assistant that creates simple, balanced weekly meal plans."
        f" Generate a meal plan in JSON format only — no explanations. Include keys for each day: "
        f"Monday through Sunday, and for each day include 'Breakfast', 'Lunch', and 'Dinner'. "
        f"The meals should reflect these cuisines: {', '.join(cuisines)}."
    )

    client = setup_monster_api()
    result = call_monster_api(prompt, context="", client=client)

    print("🧠 Raw LLM Response:\n", result)

    cleaned_json = extract_json_block(result)
    if cleaned_json:
        print(cleaned_json)
    else:
        try:
            json_output = json.loads(result)
            print(json.dumps(json_output))
        except:
            print(json.dumps({ "error": "Invalid JSON response from LLM", "raw": result }))

if __name__ == "__main__":
    main()
