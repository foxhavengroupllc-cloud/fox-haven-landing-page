'use client';

import { useEffect, useRef } from 'react';
import type { Message, Action } from '@/lib/intent-types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

interface Props {
  messages: Message[];
  isLoading: boolean;
  onAction: (action: Action) => void;
}

export default function MessageList({ messages, isLoading, onAction }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto widget-scroll px-2 py-4 space-y-4">
      {/* Welcome state */}
      {messages.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center h-full text-center px-6 py-10">
          <div className="w-14 h-14 rounded-full bg-heat-amber/15 border border-heat-amber/25 flex items-center justify-center mb-4">
            <span className="font-display text-heat-amber text-2xl">F</span>
          </div>
          <h4 className="font-display text-deep-slate text-lg mb-2">
            Hi, I'm the Fox Haven assistant
          </h4>
          <p className="font-body text-warm-gray text-sm leading-relaxed max-w-[220px]">
            Ask me about our initiatives, heat safety, or how to get involved.
          </p>
        </div>
      )}

      {/* Messages */}
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} onAction={onAction} />
      ))}

      {/* Typing indicator */}
      {isLoading && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  );
}
