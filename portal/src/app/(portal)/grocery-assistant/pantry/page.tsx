export default function PantryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
        Smallwood Family
      </p>
      <h1 className="text-xl font-semibold text-foreground mb-6">Pantry</h1>
      <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-8 text-center">
        <p className="text-muted-foreground text-sm">Pantry inventory coming soon.</p>
        <p className="text-muted-foreground/60 text-xs mt-1">
          Current stock levels, low-point alerts, and reorder suggestions.
        </p>
      </div>
    </div>
  );
}
