import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import LoadingButton from "@/components/molecules/loading-button";

test("Loading Button", () => {
  render(
    <LoadingButton type={"button"} loading={false}>
      Save
    </LoadingButton>,
  );
  expect(screen.getByTestId("loading-btn")).toBeDefined();
});
//${{ Postgres.DATABASE_URL }}
