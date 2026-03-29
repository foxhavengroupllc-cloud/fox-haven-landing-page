import type { Message, Action } from '@/lib/intent-types';
import ActionChips from './ActionChips';

interface Props {
  message: Message;
  onAction: (action: Action) => void;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export default function MessageBubble({ message, onAction }: Props) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-1`}>
      <div className={`flex items-end gap-2 max-w-[85%] ${isUser ? 'flex-row-reverse' : ''}`}>
        {/* Avatar */}
        {!isUser && (
          <div className="w-6 h-6 rounded-full bg-heat-amber flex items-center justify-center shrink-0 mb-0.5">
            <span className="font-display text-white text-[10px] leading-none">F</span>
          </div>
        )}

        {/* Bubble */}
        <div
          className={`px-4 py-3 rounded-2xl text-sm font-body leading-relaxed ${
            isUser
              ? 'bg-deep-slate text-white rounded-br-sm'
              : 'bg-mist text-charcoal rounded-bl-sm border border-black/5 shadow-sm'
          }`}
        >
          {message.content}
        </div>
      </div>

      {/* Action chips — only for assistant */}
      {!isUser && message.actions && message.actions.length > 0 && (
        <div className="w-full pl-8">
          <ActionChips actions={message.actions} onAction={onAction} />
        </div>
      )}

      {/* Timestamp */}
      <span
        className={`text-[10px] font-body text-warm-gray/60 ${isUser ? 'pr-1' : 'pl-8'}`}
      >
        {formatTime(message.timestamp)}
      </span>
    </div>
  );
}
