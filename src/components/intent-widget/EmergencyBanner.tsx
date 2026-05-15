interface Props {
  onDismiss: () => void;
}

export default function EmergencyBanner({ onDismiss }: Props) {
  return (
    <div className="bg-red-600 px-4 py-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="text-white text-lg emergency-ring shrink-0">🚨</span>
        <div className="min-w-0">
          <p className="font-body text-white font-bold text-sm leading-tight">
            Heat Emergency?
          </p>
          <p className="font-body text-white/85 text-xs">
            Call{' '}
            <a
              href="tel:911"
              className="underline font-bold hover:text-white transition-colors"
            >
              911
            </a>{' '}
            immediately, or find cooling now.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <a
          href="tel:911"
          className="px-3 py-1.5 bg-white text-red-600 rounded-full text-xs font-body font-bold hover:bg-red-50 transition-colors"
        >
          Call 911
        </a>
        <button
          onClick={onDismiss}
          className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer px-1"
          aria-label="Dismiss emergency banner"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
