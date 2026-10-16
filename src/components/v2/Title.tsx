/** Centred section title (v2rule.md §4A, enlarged in v2.1). */
export function Title({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 className="v2-title" id={id}>
      {children}
    </h2>
  );
}
