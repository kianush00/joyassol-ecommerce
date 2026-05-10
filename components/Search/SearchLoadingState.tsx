const SKELETON_COUNT = 4;

const SearchLoadingState = () => {
  return (
    <div aria-busy="true" aria-label="Cargando resultados...">
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <div
          key={i}
          className="border-b last:border-b-0 flex items-center p-2 md:p-3 gap-3"
        >
          {/* Image skeleton */}
          <div className="h-20 w-20 md:h-24 md:w-24 shrink-0 rounded-md bg-gray-200 animate-pulse" />

          {/* Info skeleton */}
          <div className="flex-1 min-w-0 px-2 py-2 space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4 mt-1" />
          </div>

          {/* Button skeleton */}
          <div className="w-32 sm:w-38 md:w-45 shrink-0">
            <div className="h-9 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchLoadingState;
