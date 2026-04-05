export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`body { background-color: var(--color-navy) !important; }`}</style>
      {children}
    </>
  );
}
