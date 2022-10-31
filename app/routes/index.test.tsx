import { render, screen } from "@testing-library/react";
import Index from "~/routes/index";
import { describe, expect, it } from "vitest";

describe("index page", () => {
  it("doesn't crush", () => {
    render(<Index />);

    expect(screen.getByText("hi!!")).toBeInTheDocument();
  });
});
