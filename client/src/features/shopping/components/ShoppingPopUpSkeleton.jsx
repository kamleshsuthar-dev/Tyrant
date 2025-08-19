function ShoppingPopUpSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((index) => (
        <>
          <div className="flex animate-pulse items-center border-b p-4">
            <div className="h-15 w-15 mr-4 bg-gray-200"></div>
            <div className="flex-1">
              <div className="mb-2 h-3 w-3/4 rounded bg-gray-200"></div>
              <div className="mb-2 h-2 w-1/4 rounded bg-gray-200"></div>
              <div className="h-2 w-1/2 rounded bg-gray-200"></div>
            </div>
            <div className="mx-4">
              <div className="h-2 w-16 rounded bg-gray-200"></div>
            </div>
            <div>
              <div className="h-2 w-20 rounded bg-gray-200"></div>
            </div>
          </div>
        </>
      ))}
    </>
  );
}

export default ShoppingPopUpSkeleton;
