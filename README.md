# Diagramming LLMs

This project is a exploration of providing LLMs a way to output visual responses.

## Method

[Mermaid.js](https://mermaid.js.org/) is a diagramming and charting language that can be outputted by LLMs. We can extract the outputted mermaid code to render.

Some specific uses for this would by for educational purposes such as providing visual representation of concepts. An example is shown on a [Twitter demo](https://x.com/johnathanchewy/status/1806442348903322103).

## Project Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Additionally, added [tailwindcss](https://tailwindcss.com/) for styling.

### [1] Setting up LLM APIs

To run an LLM you can either use Ollama or ChatGPT APIs

#### _Ollama_

For Ollama, follow the setup steps from their [repository](https://github.com/ollama/ollama?tab=readme-ov-file#ollama). Ensure you have a server running which you can test by following [this](https://github.com/ollama/ollama?tab=readme-ov-file#ollama).

#### _ChatGPT_

For ChatGPT, follow the instructions from their [site](https://platform.openai.com/docs/api-reference/introduction). Make sure to create an API key to use.

### [2] Setup environment and API keys

Run `cp .env.example .env` then follow the comments for putting proper values in your `.env` file.

### [3] Running Application

To start, run the following:

```
npm install
npm start
```

## Future Ideas

Feel free to contribute to this repository through PRs.

- [ ] Add structured outputs to generate valid mermaid.js code
- [ ] Add UI piece to switch to a specific diagram's message on click
