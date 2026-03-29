'use client';

import { useIntentChat } from '@/hooks/useIntentChat';
import WidgetTrigger from './WidgetTrigger';
import WidgetContainer from './WidgetContainer';

export default function IntentWidget() {
  const { state, open, close, toggleOpen, sendMessage, handleActionClick, resetEmergency } =
    useIntentChat();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Widget panel */}
      {state.isOpen && (
        <WidgetContainer
          messages={state.messages}
          isLoading={state.isLoading}
          isEmergency={state.isEmergency}
          onSend={sendMessage}
          onAction={handleActionClick}
          onClose={close}
          onDismissEmergency={resetEmergency}
        />
      )}

      {/* FAB trigger */}
      <WidgetTrigger
        isOpen={state.isOpen}
        isEmergency={state.isEmergency}
        onClick={toggleOpen}
        hasMessages={state.messages.length > 0}
      />
    </div>
  );
}
