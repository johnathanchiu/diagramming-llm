import json
import requests
import re


def extract_mermaid_code(text):
    # Define the regex pattern for matching the mermaid code block
    pattern = r"```mermaid(.*?)```"

    # Use re.DOTALL to allow '.' to match newlines
    matches = re.findall(pattern, text, re.DOTALL)

    # Clean up the matches by stripping unnecessary whitespace
    mermaid_code_blocks = [match.strip() for match in matches]

    return mermaid_code_blocks


SYSTEM_PROMPT = """
You are an instructor that explains things visually. You have the ability to produce diagrams via mermaid.js code.
You should always be trying to explain things visually with a mermaid.js diagram.
Do NOT mention that you are using mermaid.js to the user as this is abstracted away from the user.
Make sure each diagram you output conceptually sound yet simple so that the user can understand easily.
The user may ask follow up questions so update previous diagrams if you choose to use them. 
In some cases it might be best to use an example and then explain it via the diagram.
"""


def generate_response(model: str, prompt: str, past_messages: list[dict[str, str]]):
    url = "http://localhost:11434/api/chat"

    messages = [{"role": "system", "content": SYSTEM_PROMPT}] + past_messages
    messages.append({"role": "user", "content": prompt})

    data = {"model": model, "messages": messages}
    headers = {"Content-Type": "application/json"}

    model_response = ""
    with requests.post(url, json=data, headers=headers, stream=True) as response:
        response.raise_for_status()  # Raise an error for bad status codes
        # Stream the response content
        for chunk in response.iter_content(chunk_size=8192):
            if chunk:
                model_response += json.loads(chunk.decode("utf-8"))["message"][
                    "content"
                ]

    return model_response
