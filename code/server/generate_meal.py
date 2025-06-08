# server/generate_meal.py
import sys
import json
from openai import OpenAI
import time
from dotenv import load_dotenv
import os

load_dotenv()
MONSTER_API_KEY = os.getenv("MONSTER_API_KEY")

LLM_NAME = "Meta-Llama" 
MONSTER_MODEL_MAP = {
    "Google-Gemma": "google/gemma-2-9b-it",
    "Mistral": "mistralai/Mistral-7B-Instruct-v0.2",
    "Microsoft-Phi": "microsoft/Phi-3-mini-4k-instruct",
    "Meta-Llama": "meta-llama/Meta-Llama-3.1-8B-Instruct",
}

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
    # Expect comma-separated cuisines from CLI
    cuisines = sys.argv[1].split(",")
    prompt = f"""Generate a weekly meal plan with Breakfast, Lunch, and Dinner for 7 days using the following cuisines: {', '.join(cuisines)}."""

    context = "You are a helpful assistant that creates balanced and realistic meal plans."
    client = setup_monster_api()
    result = call_monster_api(prompt, context, client)

    try:
        json_output = json.loads(result)
        print(json.dumps(json_output))  # Pipe this as stdout for Node.js
    except:
        print(json.dumps({ "error": "Invalid JSON response from LLM", "raw": result }))

if __name__ == "__main__":
    main()
