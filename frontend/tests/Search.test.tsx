import { beforeEach, describe, expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "../src/components/Search";
import React from "react";

describe("Search", () => {
  let mockHandler;
  let user;

  beforeEach(() => {
    mockHandler = vi.fn();
    user = userEvent.setup();
  });

  test("renders without crashing", () => {
    render(<Search setSearch={mockHandler} />);
  });

  test("search input works correctly", async () => {
    const { getByPlaceholderText } = render(<Search setSearch={mockHandler} />);
    const input = getByPlaceholderText("Search by comment");
    await user.type(input, "test");
    expect(mockHandler).toHaveBeenCalledWith("test");
  });

  test("page isn't refreshed when user presses enter", async () => {
    const { getByPlaceholderText } = render(<Search setSearch={mockHandler} />);
    const input = getByPlaceholderText("Search by comment");
    await user.type(input, "{enter}");
    expect(mockHandler).not.toHaveBeenCalled();
  });
});
