import { beforeEach, describe, expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sort from "../src/components/Buttons/Sort";
import React from "react";
import { SortType } from "../src/types";

describe("Sort", () => {
  let mockHandler;
  let user;

  beforeEach(() => {
    mockHandler = vi.fn();
    user = userEvent.setup();
  });

  test("renders without crashing", () => {
    render(<Sort setSort={mockHandler} sort={"modifiedNewest"} />);
  });

  test("sort dropdown opens", async () => {
    const { getByTestId } = render(
      <Sort setSort={mockHandler} sort={"modifiedNewest"} />,
    );
    const input = getByTestId("sortDropdown");
    await user.click(input);
    expect(mockHandler).not.toHaveBeenCalled();
  });

  // sadly needs to be hardcoded
  const sortTypes: SortType[] = [
    "modifiedNewest",
    "modifiedOldest",
    "addedNewest",
    "addedOldest",
    "idAscending",
    "idDescending",
  ];

  // tests that correct sort type is called when clicking
  sortTypes.forEach((sortType) => {
    test(`sort by ${sortType}`, async () => {
      const { getByTestId, getByText } = render(
        <Sort setSort={mockHandler} sort={sortType} />,
      );
      const input = getByTestId("sortDropdown");
      await user.click(input);

      const option = getByText(sortType);
      await user.click(option);

      expect(mockHandler).toHaveBeenCalledWith(sortType);
    });
  });
});
