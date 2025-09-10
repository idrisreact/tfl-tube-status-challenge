import { renderHook, waitFor } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useTubeLineStatus } from "./useTubeLineStatus";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchTubeLineStatus } from "../services";
import React from "react";

vi.mock("../services", () => ({
  fetchTubeLineStatus: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useTubeLineStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return loading state initially", () => {
    vi.mocked(fetchTubeLineStatus).mockImplementation(
      () => new Promise(() => {})
    );

    const { result } = renderHook(() => useTubeLineStatus(), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
  });

  it("should return data when API calls succeeds", async () => {
    const mockData = [
      {
        $type:
          "Tfl.Api.Presentation.Entities.Line, Tfl.Api.Presentation.Entities",
        id: "bakerloo",
        name: "Bakerloo",
        modeName: "tube",
        disruptions: [],
        created: "2025-09-03T13:07:46.237Z",
        modified: "2025-09-03T13:07:46.237Z",
        lineStatuses: [
          {
            $type:
              "Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities",
            id: 0,
            lineId: "bakerloo",
            statusSeverity: 2,
            statusSeverityDescription: "Suspended",
            reason: "Bakerloo Line: No service due to strike action. ",
            created: "0001-01-01T00:00:00",
            validityPeriods: [
              {
                $type:
                  "Tfl.Api.Presentation.Entities.ValidityPeriod, Tfl.Api.Presentation.Entities",
                fromDate: "2025-09-09T03:14:26Z",
                toDate: "2025-09-09T18:06:27Z",
                isNow: true,
              },
            ],
            disruption: {
              $type:
                "Tfl.Api.Presentation.Entities.Disruption, Tfl.Api.Presentation.Entities",
              category: "RealTime",
              categoryDescription: "RealTime",
              description: "Bakerloo Line: No service due to strike action. ",
              affectedRoutes: [],
              affectedStops: [],
              closureText: "suspended",
            },
          },
        ],
        routeSections: [],
        serviceTypes: [
          {
            $type:
              "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
            name: "Regular",
            uri: "/Line/Route?ids=Bakerloo&serviceTypes=Regular",
          },
        ],
        crowding: {
          $type:
            "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities",
        },
      },
    ];
    vi.mocked(fetchTubeLineStatus).mockResolvedValue(mockData);

    const { result } = renderHook(() => useTubeLineStatus(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });
});
