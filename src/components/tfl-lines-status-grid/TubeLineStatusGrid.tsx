import { getLineColor } from "../../utils/get-line-colour";
import { Card } from "../card/Card";
import { useTubeLineStatus } from "../../hooks/useTubeLineStatus";
import { LoadingSkeleton } from "../loading-skeleton/LoadingSkeleton";

export const TubeLineStatusGrid = () => {
  const { data, isLoading, error } = useTubeLineStatus();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center" role="alert" aria-live="assertive">
          <h1 className="text-xl font-medium text-red-600">
            Error loading TFL data
          </h1>
          <p className="text-gray-600 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center" role="alert">
          <h1 className="text-xl font-medium text-gray-600">
            No tube data available
          </h1>
          <p className="text-gray-500 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <main className="grid grid-cols-1 md:grid-cols-2 gap-x-4 max-w-4xl w-full px-4">
        <h1 className="sr-only">TFL Tube Line Status</h1>
        <div className="sr-only" aria-live="polite">
          Showing status for {data.length} tube lines
        </div>
        {data.map((line) => {
          const status =
            line.lineStatuses?.[0]?.statusSeverityDescription ||
            "Unknown Status";
          return (
            <Card
              key={line.id}
              bannerColor={getLineColor(line.id)}
              title={line.name}
              info={status}
            />
          );
        })}
      </main>
    </div>
  );
};
