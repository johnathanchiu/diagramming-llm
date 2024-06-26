import { OLLAMA_URL, SYSTEM_PROMPT } from "./system";

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
export async function generateGPTResponse(openai, model, pastMessages) {
  pastMessages = [{ role: "system", content: SYSTEM_PROMPT }, ...pastMessages];
  const completion = await openai.chat.completions.create({
    messages: pastMessages,
    model: model,
  });

  return completion.choices[0].message.content;
}

export async function generateOllamaResponse(model, pastMessages) {
  pastMessages = [{ role: "system", content: SYSTEM_PROMPT }, ...pastMessages];

  const data = { model: model, messages: pastMessages };
  let modelResponse = "";
  try {
    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("Network response was not ok");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        modelResponse += JSON.parse(chunk).message.content;
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }

  return modelResponse;
}
