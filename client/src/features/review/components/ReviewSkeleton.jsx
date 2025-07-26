export default function ReviewSkeleton() {
  return (
    <div className="mx-auto max-w-5xl p-4  space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 ml-3">
        <div className="h-6 w-48 mx-32 bg-gray-300 rounded" />
        <div className="flex gap-2">
          <div className="h-8 w-28 bg-gray-300 rounded" />
          <div className="h-8 w-24 bg-gray-300 rounded" />
          <div className="h-8 w-32 border-2 border-dashed rounded" />
        </div>
      </div>

      {/* Grid layout */}
      <div className="grid md:grid-cols-2 gap-6 mr-3">
        {/* Rating Overview Skeleton */}
        <div className="flex flex-col items-center gap-6">
          {/* Circular rating skeleton */}
          <div className="relative w-48 h-48 rounded-full bg-gray-300" />

          {/* Ratings bars */}
          <div className="w-full space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-6 h-4 bg-gray-300 rounded" />
                <div className="flex-1 bg-gray-200 h-2 rounded">
                  <div className="bg-gray-400 h-2 rounded w-[50%]" />
                </div>
                <div className="w-4 h-4 bg-gray-300 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Review cards skeleton */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded border p-4 space-y-3 bg-white shadow-sm"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-4 bg-gray-300 rounded-full" />
                <div className="w-24 h-4 bg-gray-300 rounded" />
              </div>
              <div className="h-4 w-full bg-gray-300 rounded" />
              <div className="h-4 w-3/4 bg-gray-300 rounded" />
              <div className="h-4 w-1/2 bg-gray-300 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* See More button skeleton */}
      <div>
        <div className="w-full h-10 bg-gray-300 rounded" />
      </div>
    </div>
  );
}
