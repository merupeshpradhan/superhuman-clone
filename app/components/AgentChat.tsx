"use client";

import React, { useState } from "react";
import { Send, Sparkles, User, Bot } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function AgentChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I am your Corsair AI Assistant. Ask me to draft an email or check your calendar scheduling.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Connects our frontend chat to the Corsair API route handler we built
      const response = await fetch("/api/corsair", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            data.output ||
            "Action successfully staged via Corsair plugin layer!",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Error communicating with integration layer.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-80 border-l border-[#262626] bg-[#161616] flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-[#262626] flex items-center gap-2">
        <Sparkles size={16} className="text-orange-400" />
        <span className="text-xs font-semibold uppercase tracking-wider text-white">
          Corsair AI Agent
        </span>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="h-5 w-5 rounded bg-orange-500 flex items-center justify-center text-[10px] text-black">
                <Bot size={12} />
              </div>
            )}
            <div
              className={`p-2.5 rounded-lg max-w-[80%] ${msg.role === "user" ? "bg-orange-500 text-black font-medium" : "bg-[#262626] text-gray-200"}`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-gray-500 animate-pulse text-[11px]">
            Agent executing tools via Corsair...
          </div>
        )}
      </div>

      {/* Message Input Box */}
      <form
        onSubmit={handleSend}
        className="p-3 border-t border-[#262626] flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI Agent..."
          className="flex-1 bg-[#222] border border-[#333] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
        />
        <button
          type="submit"
          className="p-1.5 rounded bg-orange-500 text-black hover:bg-orange-600 transition-colors"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
