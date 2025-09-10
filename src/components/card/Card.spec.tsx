import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card } from "./Card";

const defaultCardProps = {
  bannerColor: "border-l-blue-500",
  title: "Central",
  info: "Good Service",
};

const createCardProps = (overrides: Partial<typeof defaultCardProps> = {}) => ({
  ...defaultCardProps,
  ...overrides,
});

describe("Card", () => {
  describe("Rendering", () => {
    it("should render with basic props", () => {
      const props = createCardProps();
      render(<Card {...props} />);

      expect(screen.getByText("Central")).toBeInTheDocument();
      expect(screen.getByText("Good Service")).toBeInTheDocument();
    });

    it("should apply the correct banner color class", () => {
      const props = createCardProps({ bannerColor: "border-l-red-500" });
      render(<Card {...props} />);

      const article = screen.getByRole("region");
      expect(article).toHaveClass("border-l-red-500");
    });

    it("should render different tube line data", () => {
      const props = createCardProps({
        title: "Northern",
        info: "Minor Delays",
        bannerColor: "border-l-black"
      });
      render(<Card {...props} />);

      expect(screen.getByText("Northern")).toBeInTheDocument();
      expect(screen.getByText("Minor Delays")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic HTML structure", () => {
      const props = createCardProps();
      render(<Card {...props} />);

      // Should use article element with region role
      expect(screen.getByRole("region")).toBeInTheDocument();
      
      // Should have heading structure
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Central");
    });

    it("should have proper ARIA attributes", () => {
      const props = createCardProps();
      render(<Card {...props} />);

      const article = screen.getByRole("region");
      
      // Should have proper ARIA relationships
      expect(article).toHaveAttribute("aria-labelledby");
      expect(article).toHaveAttribute("aria-describedby");
    });

    it("should have screen reader support for status updates", () => {
      const props = createCardProps();
      render(<Card {...props} />);

      const statusElement = screen.getByText("Good Service");
      expect(statusElement).toHaveAttribute("aria-live", "polite");
      
      // Should have hidden text for screen readers
      expect(screen.getByText("Current status:")).toBeInTheDocument();
    });

    it("should generate unique IDs for multiple instances", () => {
      render(
        <>
          <Card bannerColor="border-l-blue-500" title="Central" info="Good Service" />
          <Card bannerColor="border-l-red-500" title="Northern" info="Minor Delays" />
        </>
      );

      const centralHeading = screen.getByText("Central");
      const northernHeading = screen.getByText("Northern");
      
      // Should have different IDs
      expect(centralHeading.id).not.toBe(northernHeading.id);
    });
  });

  describe("Styling", () => {
    it("should have base CSS classes", () => {
      const props = createCardProps();
      render(<Card {...props} />);

      const article = screen.getByRole("region");
      
      // Should have base styling classes
      expect(article).toHaveClass("border");
      expect(article).toHaveClass("border-l-4");
      expect(article).toHaveClass("bg-white");
      expect(article).toHaveClass("p-3");
    });

    it("should have focus styles for accessibility", () => {
      const props = createCardProps();
      render(<Card {...props} />);

      const article = screen.getByRole("region");
      
      // Should have focus styles for keyboard navigation
      expect(article).toHaveClass("focus-within:ring-2");
      expect(article).toHaveClass("focus-within:ring-blue-500");
    });
  });
});