import { render, screen } from "@testing-library/react";
import { TubeLineStatusGrid } from "./TubeLineStatusGrid";
import { describe, vi, it, expect, beforeEach } from "vitest";
import { useTubeLineStatus } from "../../hooks/useTubeLineStatus";
import type { TflLineResponse } from "../../types";

vi.mock("../../hooks/useTubeLineStatus", () => ({
  useTubeLineStatus: vi.fn(),
}));

const createMockTubeLineData = (
  overrides: Partial<TflLineResponse> = {}
): TflLineResponse => ({
  $type: "Tfl.Api.Presentation.Entities.Line, Tfl.Api.Presentation.Entities",
  id: "central",
  name: "Central",
  modeName: "tube",
  disruptions: [],
  created: "2025-09-09T15:00:00Z",
  modified: "2025-09-09T15:00:00Z",
  lineStatuses: [
    {
      $type: "Tfl.Api.Presentation.Entities.LineStatus",
      id: 0,
      lineId: "central",
      statusSeverity: 10,
      statusSeverityDescription: "Good Service",
      reason: "",
      created: "2025-09-09T15:00:00Z",
      validityPeriods: [],
      disruption: {
        $type: "Tfl.Api.Presentation.Entities.Disruption",
        category: "RealTime",
        categoryDescription: "RealTime",
        description: "Good Service",
        affectedRoutes: [],
        affectedStops: [],
        closureText: "",
      },
    },
  ],
  routeSections: [],
  serviceTypes: [],
  crowding: { $type: "Tfl.Api.Presentation.Entities.Crowding" },
  ...overrides,
});

const renderComponent = () => render(<TubeLineStatusGrid />);

const mockQueryResult = (overrides: any) => overrides as any;

describe("TubeLineStatusGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Loading State", () => {
    it("should display loading skeleton while fetching data", () => {
      vi.mocked(useTubeLineStatus).mockReturnValue(
        mockQueryResult({
          data: undefined,
          isLoading: true,
          error: null,
        })
      );

      renderComponent();
      expect(
        screen.getByLabelText("Loading tube line status data")
      ).toBeInTheDocument();
    });
  });

  describe("Success States", () => {
    it("should render tube lines with correct data", () => {
      const mockData = [createMockTubeLineData()];
      vi.mocked(useTubeLineStatus).mockReturnValue(
        mockQueryResult({
          data: mockData,
          isLoading: false,
          error: null,
        })
      );

      renderComponent();

      expect(screen.getByText("Central")).toBeInTheDocument();
      expect(screen.getByText("Good Service")).toBeInTheDocument();
    });

    it("should handle multiple tube lines", () => {
      const mockData = [
        createMockTubeLineData({ id: "central", name: "Central" }),
        createMockTubeLineData({
          id: "northern",
          name: "Northern",
          lineStatuses: [
            {
              $type: "test",
              id: 1,
              lineId: "northern",
              statusSeverity: 6,
              statusSeverityDescription: "Minor Delays",
              reason: "Earlier signal failure",
              created: "2025-09-09T15:00:00Z",
              validityPeriods: [],
              disruption: {
                $type: "test",
                category: "RealTime",
                categoryDescription: "RealTime",
                description: "Minor Delays",
                affectedRoutes: [],
                affectedStops: [],
                closureText: "",
              },
            },
          ],
        }),
      ];
      vi.mocked(useTubeLineStatus).mockReturnValue(
        mockQueryResult({
          data: mockData,
          isLoading: false,
          error: null,
        })
      );

      renderComponent();

      expect(screen.getByText("Central")).toBeInTheDocument();
      expect(screen.getByText("Northern")).toBeInTheDocument();
      expect(screen.getByText("Good Service")).toBeInTheDocument();
      expect(screen.getByText("Minor Delays")).toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    it("should handle network errors gracefully", () => {
      const mockError = new Error("Network Error");
      vi.mocked(useTubeLineStatus).mockReturnValue(
        mockQueryResult({
          data: undefined,
          isLoading: false,
          error: mockError,
        })
      );

      renderComponent();

      expect(screen.getByText("Error loading TFL data")).toBeInTheDocument();
      expect(screen.getByText("Please try again later")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  describe("Empty States", () => {
    it("should display empty state when no data", () => {
      vi.mocked(useTubeLineStatus).mockReturnValue(
        mockQueryResult({
          data: [],
          isLoading: false,
          error: null,
        })
      );

      renderComponent();

      expect(screen.getByText("No tube data available")).toBeInTheDocument();
      expect(screen.getByText("Please try again later")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA landmarks", () => {
      const mockData = [createMockTubeLineData()];
      vi.mocked(useTubeLineStatus).mockReturnValue(
        mockQueryResult({
          data: mockData,
          isLoading: false,
          error: null,
        })
      );

      renderComponent();

      expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("should have proper heading structure", () => {
      const mockData = [createMockTubeLineData()];
      vi.mocked(useTubeLineStatus).mockReturnValue(
        mockQueryResult({
          data: mockData,
          isLoading: false,
          error: null,
        })
      );

      renderComponent();

      const mainHeading = screen.getByText("TFL Tube Line Status");
      expect(mainHeading).toBeInTheDocument();

      const lineHeading = screen.getByText("Central");
      expect(lineHeading).toBeInTheDocument();
      expect(lineHeading.tagName).toBe("H2");
    });

    it("should announce status changes to screen readers", () => {
      const mockData = [createMockTubeLineData()];
      vi.mocked(useTubeLineStatus).mockReturnValue(
        mockQueryResult({
          data: mockData,
          isLoading: false,
          error: null,
        })
      );

      renderComponent();

      const statusAnnouncement = screen.getByText(
        "Showing status for 1 tube lines"
      );
      expect(statusAnnouncement).toHaveAttribute("aria-live", "polite");
    });
  });
});
