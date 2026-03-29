import type { Action } from '@/lib/intent-types';

interface Props {
  actions: Action[];
  onAction: (action: Action) => void;
}

export default function ActionChips({ actions, onAction }: Props) {
  if (!actions.length) return null;

  return (
    <div className="flex flex-wrap gap-2 px-4 pb-1 pt-0.5">
      {actions.map((action, i) => (
        <button
          key={`${action.label}-${i}`}
          onClick={() => onAction(action)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-heat-amber/30 bg-heat-amber/6 text-heat-amber text-xs font-body font-medium hover:bg-heat-amber hover:text-white hover:border-heat-amber transition-all duration-150 cursor-pointer"
        >
          {action.label}
          <span className="text-[10px] opacity-60">→</span>
        </button>
      ))}
    </div>
  );
}
