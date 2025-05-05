import { Card, CardContent } from "@/components/ui/card";
function productListSkeleton() {
  const skeletonItems = Array(8).fill(null);
  return (
    <>
      <div className="bg-secondary">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products Loading</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {skeletonItems.map((_, index) => (
              <div key={index} className="group">
                <Card className="max-w-sm overflow-hidden rounded-3xl border-0 shadow-lg">
                  <CardContent className="p-4">
                    {/* Image skeleton */}
                    <div className="aspect-square w-full rounded-lg bg-gray-200 animate-pulse" />

                    {/* Title skeleton */}
                    <div className="mt-4 h-4 w-3/4 rounded bg-gray-200 animate-pulse" />

                    {/* Rating skeleton */}
                    <div className="mt-1 flex items-center gap-1">
                      <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
                      <div className="h-4 w-8 rounded bg-gray-200 animate-pulse" />
                    </div>

                    {/* Price section skeleton */}
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
                        <div className="h-4 w-16 rounded bg-gray-200 animate-pulse" />
                      </div>
                      <div className="h-6 w-24 rounded bg-gray-200 animate-pulse" />
                    </div>

                    {/* Offer section skeleton */}
                    <div className="mt-3 space-y-2">
                      <div className="h-6 w-full rounded-full bg-gray-200 animate-pulse" />
                      <div className="h-4 w-32 rounded bg-gray-200 animate-pulse" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default productListSkeleton;
