export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl rounded-bl-sm bg-mist border border-black/6 shadow-sm">
        <div className="flex items-center gap-1">
          <span className="dot-1 w-1.5 h-1.5 rounded-full bg-heat-amber inline-block" />
          <span className="dot-2 w-1.5 h-1.5 rounded-full bg-heat-amber inline-block" />
          <span className="dot-3 w-1.5 h-1.5 rounded-full bg-heat-amber inline-block" />
        </div>
        <span className="font-body text-xs text-warm-gray ml-1">Fox Haven is thinking…</span>
      </div>
    </div>
  );
}
