export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fefdf8]">
      <div className="text-center">
        <div className="inline-block">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
        <p className="mt-4 text-stone-600 font-medium">Loading...</p>
      </div>
    </div>
  );
}
