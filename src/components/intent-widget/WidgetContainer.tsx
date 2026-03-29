'use client';

import type { Message, Action } from '@/lib/intent-types';
import MessageList from './MessageList';
import InputBar from './InputBar';
import EmergencyBanner from './EmergencyBanner';

interface Props {
  messages: Message[];
  isLoading: boolean;
  isEmergency: boolean;
  onSend: (message: string) => void;
  onAction: (action: Action) => void;
  onClose: () => void;
  onDismissEmergency: () => void;
}

export default function WidgetContainer({
  messages,
  isLoading,
  isEmergency,
  onSend,
  onAction,
  onClose,
  onDismissEmergency,
}: Props) {
  return (
    <div
      className={`widget-enter flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden border ${
        isEmergency ? 'border-red-400/50' : 'border-black/8'
      }`}
      style={{ height: '520px', width: '360px' }}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between px-5 py-4 shrink-0 ${
          isEmergency ? 'bg-red-600' : 'bg-deep-slate'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-heat-amber flex items-center justify-center">
            <span className="font-display text-white text-base leading-none">F</span>
          </div>
          <div>
            <div className="font-body text-white font-semibold text-sm leading-tight">
              Fox Haven Assistant
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="font-body text-white/50 text-[10px]">Online</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
          aria-label="Close assistant"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Emergency banner */}
      {isEmergency && <EmergencyBanner onDismiss={onDismissEmergency} />}

      {/* Messages */}
      <MessageList messages={messages} isLoading={isLoading} onAction={onAction} />

      {/* Input */}
      <InputBar onSend={onSend} isLoading={isLoading} />
    </div>
  );
}
