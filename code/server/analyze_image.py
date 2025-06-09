# server/analyze_image.py
import sys
import json
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
OPENAI_KEY = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=OPENAI_KEY)

def main():
    base64_image = sys.argv[1]

    try:
        response = client.responses.create(
            model="gpt-4.1",  # or "gpt-4.1-mini" if you're using that
            input=[
                {
                    "role": "user",
                    "content": [
                        { "type": "input_text", "text": "What food is in this image? Give nutritional info (calories, macros)." },
                        {
                            "type": "input_image",
                            "image_url": f"data:image/jpeg;base64,{base64_image}",
                        },
                    ],
                }
            ],
        )

        print(json.dumps({ "result": response.output_text }))

    except Exception as e:
        print(json.dumps({ "error": str(e) }))
        sys.exit(1)

if __name__ == "__main__":
    main()
