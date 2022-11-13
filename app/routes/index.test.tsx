import { render } from "@testing-library/react";
import Index from "~/routes/index";
import { describe, it } from "vitest";

describe("index page", () => {
  it("doesn't crush", () => {
    render(<Index />);
  });
});
