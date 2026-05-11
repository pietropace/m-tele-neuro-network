"use client";

import { Send, X } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const starters = [
  "Quale istituto ha più esami?",
  "Qual è il trend 2020-2026?",
  "Confronta Bari e Telese.",
];

export default function ObservatoryAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Ciao, posso rispondere sui dati della Network Observatory.",
    },
  ]);

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading) {
      return;
    }

    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/observatory-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = (await response.json()) as { answer?: string };
      setMessages([...nextMessages, { role: "assistant", content: data.answer ?? "Non riesco a rispondere ora." }]);
    } catch {
      setMessages([...nextMessages, { role: "assistant", content: "Errore temporaneo. Riprova tra poco." }]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(input);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="fixed bottom-5 left-5 z-[90] flex h-12 w-12 items-center justify-center border border-white/15 bg-white text-[#061215] shadow-lg"
        aria-label="Open observatory assistant"
      >
        {open ? (
          <X size={19} />
        ) : (
          <Image src="/favicon.ico" alt="" width={22} height={22} className="h-6 w-6" />
        )}
      </button>

      {open && (
        <section className="fixed inset-x-4 bottom-24 z-[90] border border-white/15 bg-[#071417]/95 p-4 text-white shadow-2xl backdrop-blur md:left-5 md:right-auto md:w-[25rem]">
          <div className="border-b border-white/10 pb-3">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#88B7A5]">Data assistant</p>
            <p className="mt-2 text-sm leading-6 text-[#C9D9DD]">Assistente dati della Network Observatory.</p>
          </div>

          <div className="mt-4 max-h-[18rem] space-y-3 overflow-y-auto pr-1">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`text-sm leading-6 ${message.role === "user" ? "ml-8 text-white" : "mr-8 text-[#C9D9DD]"}`}
              >
                <span className={`block border p-3 ${message.role === "user" ? "border-[#88B7A5]/40 bg-[#88B7A5]/10" : "border-white/10 bg-white/[0.04]"}`}>
                  {message.content}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {starters.map((starter) => (
              <button
                key={starter}
                type="button"
                disabled={loading}
                onClick={() => void ask(starter)}
                className="border border-white/10 px-2.5 py-1.5 text-left text-[10px] uppercase tracking-[0.12em] text-[#A9BBC0] transition hover:border-[#88B7A5]/50 hover:text-white disabled:opacity-50"
              >
                {starter}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Fai una domanda..."
              className="min-w-0 flex-1 border border-white/10 bg-[#061215] px-3 py-3 text-sm text-white placeholder:text-[#A9BBC0] focus:border-[#88B7A5] focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-12 items-center justify-center bg-[#88B7A5] text-[#061215] disabled:opacity-60"
              aria-label="Send question"
            >
              <Send size={17} />
            </button>
          </form>
        </section>
      )}
    </>
  );
}
