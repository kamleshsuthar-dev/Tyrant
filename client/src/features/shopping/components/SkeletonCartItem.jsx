
export function SkeletonCartItem() {
  return (
    <>
    {Array.from({length:4}).map((index)=>(
        <div className="flex items-center p-4 border-b animate-pulse">
        <div className="bg-gray-200 h-20 w-20 mr-4"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="mx-4">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
    </div>
    ))}
    </>
  
  );
}
