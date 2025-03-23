import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import SVGCircle from "@/components/atoms/svg-circle";

test("SVG CIRCLE", () => {
  render(<SVGCircle />);
  expect(screen.getByTestId("circle")).toBeDefined();
});
