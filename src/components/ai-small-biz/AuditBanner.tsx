import Link from 'next/link';

export default function AuditBanner() {
  return (
    <div className="mt-4 flex items-center justify-between gap-3 bg-[rgba(249,115,22,0.07)] border border-[rgba(249,115,22,0.2)] rounded-lg px-4 py-3">
      <div className="min-w-0">
        <p className="text-[#F1F5F9] text-[12px] font-semibold">Already ready to start?</p>
        <p className="text-[#94A3B8] text-[11px] mt-0.5 leading-snug">
          Skip the form, take the audit directly.
        </p>
      </div>
      <Link
        href="/audit"
        className="shrink-0 border border-[#e05e14] text-[#e05e14] bg-transparent rounded-md px-3 py-1.5 text-[11px] font-semibold hover:bg-[rgba(249,115,22,0.08)] transition-colors whitespace-nowrap"
      >
        Start the audit →
      </Link>
    </div>
  );
}
