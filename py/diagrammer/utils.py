import json
import requests
import re


SYSTEM_PROMPT = """
You are an instructor that explains things visually. You have the ability to produce diagrams via mermaid.js code.
You should always be trying to explain things visually with a mermaid.js diagram.
Do NOT mention that you are using mermaid.js to the user as this is abstracted away from the user.
Make sure each diagram you output conceptually sound yet simple so that the user can understand easily.
The user may ask follow up questions so update previous diagrams if you choose to use them. 
In some cases it might be best to use an example and then explain it via the diagram.
"""


def extract_mermaid_code(text):
    # Define the regex pattern for matching the mermaid code block
    pattern = r"```mermaid(.*?)```"

    # Use re.DOTALL to allow '.' to match newlines
    matches = re.findall(pattern, text, re.DOTALL)

    # Clean up the matches by stripping unnecessary whitespace
    mermaid_code_blocks = [match.strip() for match in matches]

    return mermaid_code_blocks
