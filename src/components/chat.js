import React, { useState } from "react";

import { MermaidComponent } from "./diagram";
import { extractMermaidCode, generateResponse } from "../lib/utils";

export function ChatInterfaceComponent() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [diagramSource, setDiagramSource] = useState("");

  const handleSend = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { role: "user", content: input }];
      setMessages(newMessages);
      setInput("");
      setLoading(true);

      try {
        const response = await generateResponse("llama3", newMessages);

        let extractedMermaidCode = extractMermaidCode(response);
        if (extractedMermaidCode) {
          setDiagramSource(extractedMermaidCode[0]);
        }

        setMessages([...newMessages, { role: "assistant", content: response }]);
      } catch (error) {
        console.error("Error fetching response:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="App flex h-screen bg-gray-100">
      <div className="chat-window w-2/3 flex flex-col border-r border-gray-300 bg-white">
        <div className="messages flex-1 p-4 overflow-y-scroll">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message mb-2 p-2 rounded text-left ${
                msg.role === "user"
                  ? "bg-green-100 ml-auto w-5/6"
                  : "bg-gray-200 mr-auto w-5/6"
              }`}
            >
              <pre className="whitespace-pre-wrap">{msg.content}</pre>
            </div>
          ))}
          {loading && (
            <div className="message mb-2 p-2 rounded bg-gray-200 self-start">
              Loading...
            </div>
          )}
        </div>
        <div className="input-area flex border-t border-gray-300">
          <textarea
            className="flex-1 p-2 border-none focus:outline-none resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                if (!e.shiftKey) {
                  e.preventDefault();
                  await handleSend();
                }
              }
            }}
          />
          <button
            className="p-2 bg-blue-500 text-white hover:bg-blue-700"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
      <div className="extra-content w-1/3 p-4">
        <div className="h-full flex justify-center items-center text-gray-500">
          <MermaidComponent id={0} source={diagramSource} />
        </div>
      </div>
    </div>
  );
}
