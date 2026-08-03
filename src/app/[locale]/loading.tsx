export default function LocaleLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
        <p className="mt-3 text-stone-600 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}
