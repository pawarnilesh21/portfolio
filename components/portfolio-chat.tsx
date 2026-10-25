"use client";
import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  text: string;
  error?: boolean;
  sources?: { id: string; title: string; href: string }[];
};
const suggestions = [
  "Tell me about Nilesh",
  "How does DocMind work?",
  "What is his internship experience?",
];
export function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLTextAreaElement>(null);
  const panel = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const end = useRef<HTMLDivElement>(null);
  const abort = useRef<AbortController | null>(null);
  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const background = [
      ...document.querySelectorAll<HTMLElement>(
        "body > header, body > main, body > footer, body > .skip-link",
      ),
    ];
    background.forEach((el) => {
      el.inert = true;
    });
    return () =>
      background.forEach((el) => {
        el.inert = false;
      });
  }, [open]);
  useEffect(() => {
    if (open) end.current?.scrollIntoView({ block: "nearest" });
  }, [messages, busy, open]);
  useEffect(() => () => abort.current?.abort(), []);
  function close() {
    setOpen(false);
    trigger.current?.focus();
  }
  async function send(value: string) {
    const text = value.trim();
    if (!text || text.length > 1000 || busy) return;
    const history = messages
      .filter((m) => m.role === "user")
      .slice(-6)
      .map((m) => m.text);
    setMessages((m) => [...m, { role: "user", text }]);
    setQuestion("");
    setBusy(true);
    abort.current = new AbortController();
    const timeout = setTimeout(() => abort.current?.abort(), 25_000);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text, history }),
        signal: abort.current.signal,
      });
      const data = await response.json();
      if (!response.ok || typeof data.answer !== "string")
        throw new Error(
          data.error || "The assistant is unavailable. Please try again.",
        );
      setMessages((m) => [
        ...m,
        { role: "assistant", text: data.answer, sources: data.sources },
      ]);
    } catch (error) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          error: true,
          text:
            error instanceof Error && error.name !== "AbortError"
              ? error.message
              : "The request timed out. Please try again.",
        },
      ]);
      setQuestion(text);
    } finally {
      clearTimeout(timeout);
      setBusy(false);
      input.current?.focus();
    }
  }
  return (
    <div className="portfolio-chat">
      {open && (
        <section
          ref={panel}
          id="portfolio-chat-panel"
          className="chat-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-title"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              close();
            }
            if (e.key === "Tab") {
              const elements = panel.current?.querySelectorAll<HTMLElement>(
                "button:not(:disabled), a[href], textarea",
              );
              if (!elements?.length) return;
              const first = elements[0],
                last = elements[elements.length - 1];
              if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
              } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
              }
            }
          }}
        >
          <header className="chat-header">
            <div>
              <span className="chat-kicker">
                MEET THE PERSON BEHIND THE WORK
              </span>
              <h2 id="chat-title">
                Ask about Nilesh<span>.</span>
              </h2>
            </div>
            <button
              className="chat-close"
              aria-label="Close portfolio chat"
              onClick={close}
            >
              ×
            </button>
          </header>
          <div
            className="chat-messages"
            role="log"
            aria-label="Portfolio conversation"
            aria-live="polite"
            aria-relevant="additions text"
          >
            {messages.length === 0 && (
              <div className="chat-welcome">
                <p>Curious about a project or his experience?</p>
                <p>
                  I’ll find answers in Nilesh’s portfolio. If something isn’t
                  documented, I’ll say so.
                </p>
                <div className="chat-suggestions">
                  {suggestions.map((s) => (
                    <button key={s} onClick={() => send(s)}>
                      {s}
                      <span aria-hidden="true">↗</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div
                className={
                  "chat-message " + m.role + (m.error ? " chat-error" : "")
                }
                key={i}
              >
                <span className="chat-speaker">
                  {m.role === "user"
                    ? "YOU"
                    : m.error
                      ? "CONNECTION NOTICE"
                      : "PORTFOLIO ASSISTANT"}
                </span>
                <p>{m.text}</p>
                {!!m.sources?.length && (
                  <div className="chat-sources">
                    <span>From Nilesh’s portfolio:</span>
                    {m.sources.map((s) => (
                      <a key={s.id} href={s.href} onClick={close}>
                        {s.title} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {busy && (
              <p className="chat-pending" role="status">
                Finding relevant portfolio information…
              </p>
            )}
            <div ref={end} />
          </div>
          <form
            className="chat-form"
            onSubmit={(e) => {
              e.preventDefault();
              void send(question);
            }}
          >
            <label htmlFor="portfolio-question" className="sr-only">
              Your question about Nilesh
            </label>
            <textarea
              ref={input}
              id="portfolio-question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              maxLength={1000}
              rows={2}
              placeholder="Ask about a project or experience…"
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  !e.nativeEvent.isComposing
                ) {
                  e.preventDefault();
                  void send(question);
                }
              }}
            />
            <button
              className="chat-send"
              type="submit"
              disabled={busy || !question.trim()}
              aria-label="Send question"
            >
              ↑
            </button>
          </form>
          <footer className="chat-footer">
            <span>
              Messages are sent to Groq. Don’t share sensitive information.
            </span>
            <button
              disabled={busy || messages.length === 0}
              onClick={() => {
                setMessages([]);
                setQuestion("");
                input.current?.focus();
              }}
            >
              Clear chat
            </button>
          </footer>
        </section>
      )}
      <button
        ref={trigger}
        className="chat-trigger"
        aria-label={open ? "Close portfolio chat" : "Ask about Nilesh"}
        aria-expanded={open}
        aria-controls="portfolio-chat-panel"
        onClick={() => (open ? close() : setOpen(true))}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          aria-hidden="true"
        >
          <path d="M20 11.5a8 8 0 0 1-8 8H5l-3 2v-10a9 9 0 0 1 18 0Z" />
          <path
            d="M7 11h.01M11 11h.01M15 11h.01"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
