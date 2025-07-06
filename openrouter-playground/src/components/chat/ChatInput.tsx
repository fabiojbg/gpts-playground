import React from "react";
import { useOpenAI } from "@/context/OpenAIProvider";
import { MdSend, MdUndo } from "react-icons/md"; // Added MdUndo

type Props = {};

export default function ChatInput({}: Props) {
  const { addMessage, loading, messages, removeLastMessage } = useOpenAI(); // Added messages and removeLastMessage
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const [input, setInput] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (loading) return;
    e.preventDefault();
    addMessage(input, true, "user");
    setInput("");
  };

  React.useEffect(() => {
    const resize = () => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "40px";
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      }
    };

    resize();
  }, [input]);

  // Handle submitting with enter
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e as any);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSubmit]);

  return (
    <div className="fixed bottom-0 flex h-40 w-full bg-gradient-to-t from-[rgb(var(--bg-secondary))] to-transparent md:w-[calc(100%-260px)]">
      <form
        className="mx-auto flex h-full w-full max-w-4xl items-end justify-center p-4 pb-10"
        onSubmit={handleSubmit}
      >
        <div className="relative flex w-full flex-row rounded border border-stone-500/20 bg-tertiary shadow-xl">
          <textarea
            ref={textAreaRef}
            className="max-h-[200px] w-full resize-none border-none bg-tertiary p-4 text-primary outline-none"
            onChange={handleChange}
            value={input}
            rows={1}
          />
          {messages.length > 0 && ( // Only show undo button if there are messages
            <button
              type="button" // Changed to type="button" to prevent form submission
              onClick={removeLastMessage}
              className="rounded p-4 text-primary hover:bg-primary/50"
              title="Remove last message"
            >
              <MdUndo />
            </button>
          )}
          <button
            type="submit"
            className="rounded p-4 text-primary hover:bg-primary/50"
          >
            {loading ? (
              <div className="mx-auto h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
            ) : (
              <MdSend />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
