import { SYSTEM_PROMPT } from "./system";

export function extractMermaidCode(text) {
  // Define the regex pattern for matching the mermaid code block
  const pattern = /```mermaid([\s\S]*?)```/g;

  // Use the regex pattern to find all matches
  let match;
  let matches = [];
  let modifiedText = text;

  while ((match = pattern.exec(text)) !== null) {
    // Clean up the match by trimming unnecessary whitespace
    matches.push(match[1]);

    // Remove the matched Mermaid code block from the original text
    modifiedText = modifiedText.replace(match[0], "");
  }

  return [matches, modifiedText];
}
export async function generateResponse(openai, model, pastMessages) {
  pastMessages = [{ role: "system", content: SYSTEM_PROMPT }, ...pastMessages];
  const completion = await openai.chat.completions.create({
    messages: pastMessages,
    model: model,
  });
  return completion.choices[0].message.content;
}
