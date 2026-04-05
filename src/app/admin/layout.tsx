export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`body { background-color: var(--color-navy) !important; }`}</style>
      {children}
    </>
  );
}
