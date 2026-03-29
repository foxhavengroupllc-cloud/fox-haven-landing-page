interface Props {
  isOpen: boolean;
  isEmergency: boolean;
  onClick: () => void;
  hasMessages: boolean;
}

export default function WidgetTrigger({ isOpen, isEmergency, onClick, hasMessages }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? 'Close assistant' : 'Open Fox Haven assistant'}
      className={`relative w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        isEmergency
          ? 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500'
          : 'bg-heat-amber hover:bg-heat-amber-light focus-visible:ring-heat-amber'
      } ${isOpen ? 'scale-90' : 'hover:scale-105'}`}
    >
      {/* Pulse ring */}
      {!isOpen && !hasMessages && (
        <span
          className="absolute inset-0 rounded-full bg-heat-amber/40 animate-pulse-slow"
          aria-hidden="true"
        />
      )}

      {/* Icon */}
      {isOpen ? (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : isEmergency ? (
        <span className="text-2xl">🚨</span>
      ) : (
        <span className="font-display text-white text-xl leading-none">F</span>
      )}

      {/* Unread dot */}
      {hasMessages && !isOpen && (
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white" />
      )}
    </button>
  );
}
