import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatCounter from "@/components/StatCounter";

describe("StatCounter", () => {
  it("renders with a simple numeric value", () => {
    render(<StatCounter value="14" />);
    expect(screen.getByText("14")).toBeDefined();
  });

  it("renders with a value and suffix", () => {
    render(<StatCounter value="14+" />);
    expect(screen.getByText("14+")).toBeDefined();
  });

  it("renders with a value plus suffix", () => {
    render(<StatCounter value="15000+" />);
    expect(screen.getByText("15000+")).toBeDefined();
  });
});
