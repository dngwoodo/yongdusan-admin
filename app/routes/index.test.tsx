import { render, screen } from "@testing-library/react";
import Index from "~/routes/index";
import { expect, describe, it } from "vitest";

describe("index page", () => {
  it("doesn't crush", () => {
    render(<Index />);

    expect(screen.getByText("hi!!")).toBeInTheDocument();
  });
});
