// Skeleton loader reutilizable — reemplaza el fallback={null} en lazy pages
// Uso: <Suspense fallback={<PageSkeleton />}>

export default function PageSkeleton() {
  return (
    <div className="min-h-screen bg-dark animate-pulse" aria-busy="true" aria-label="Cargando página">
      {/* Hero skeleton */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="h-3 w-24 bg-white/8 rounded mb-8" />
          <div className="h-5 w-36 bg-brand/15 rounded mb-7" />
          <div className="h-10 w-3/4 bg-white/8 rounded mb-4" />
          <div className="h-10 w-1/2 bg-white/5 rounded mb-6" />
          <div className="h-5 w-full bg-white/5 rounded mb-2" />
          <div className="h-5 w-5/6 bg-white/5 rounded mb-2" />
          <div className="h-5 w-4/6 bg-white/5 rounded mb-10" />
          <div className="flex gap-4">
            <div className="h-12 w-48 bg-brand/20 rounded" />
            <div className="h-12 w-36 bg-white/8 rounded" />
          </div>
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="h-7 w-48 bg-white/8 rounded mx-auto mb-3" />
          <div className="h-4 w-64 bg-white/5 rounded mx-auto mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white/3 border border-white/5 rounded-2xl p-6">
                <div className="h-4 w-16 bg-brand/15 rounded mb-3" />
                <div className="h-6 w-3/4 bg-white/8 rounded mb-3" />
                <div className="h-4 w-full bg-white/5 rounded mb-2" />
                <div className="h-4 w-5/6 bg-white/5 rounded mb-2" />
                <div className="h-4 w-4/6 bg-white/5 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
