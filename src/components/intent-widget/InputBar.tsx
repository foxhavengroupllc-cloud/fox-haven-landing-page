'use client';

import { useState, useRef } from 'react';

interface Props {
  onSend: (message: string) => void;
  isLoading: boolean;
}

const SUGGESTIONS = ['Find cooling near me', 'Join app beta', 'How to partner?', 'About shelters'];

export default function InputBar({ onSend, isLoading }: Props) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = value.trim();
    if (!text || isLoading) return;
    onSend(text);
    setValue('');
  }

  function handleSuggestion(s: string) {
    onSend(s);
  }

  return (
    <div className="border-t border-black/6 bg-white/80 backdrop-blur-sm">
      {/* Quick suggestions */}
      <div className="flex gap-1.5 px-3 py-2 overflow-x-auto">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => handleSuggestion(s)}
            disabled={isLoading}
            className="whitespace-nowrap px-3 py-1 rounded-full bg-mist border border-black/8 text-charcoal text-[11px] font-body hover:border-heat-amber/30 hover:text-heat-amber transition-all duration-150 cursor-pointer disabled:opacity-40 shrink-0"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input row */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 pb-3">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask anything…"
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 rounded-xl bg-mist border border-black/8 text-deep-slate placeholder-warm-gray font-body text-sm focus:outline-none focus:border-heat-amber/40 transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!value.trim() || isLoading}
          className="w-9 h-9 rounded-xl bg-heat-amber disabled:bg-warm-gray/30 flex items-center justify-center transition-colors cursor-pointer disabled:cursor-not-allowed shrink-0"
          aria-label="Send message"
        >
          {isLoading ? (
            <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}
