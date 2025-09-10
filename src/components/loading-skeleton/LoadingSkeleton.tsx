export const LoadingSkeleton = () => (
  <div
    aria-live="polite"
    aria-label="Loading tube line status data"
    className="grid grid-cols-1 md:grid-cols-2 gap-x-4 max-w-4xl w-full px-4"
  >
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} className="animate-pulse bg-gray-200 h-16 rounded mb-2" />
    ))}
  </div>
);
