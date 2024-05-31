import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import BoxList from "../src/components/BoxList";
import { boxes as dummydata } from "../src/dummydata";

import React from "react";

const paginationLength = 10;

describe("BoxList", () => {
  let mockHandler;
  let user;

  beforeEach(() => {
    mockHandler = vi.fn();
    user = userEvent.setup();
  });

  test("renders without crashing", () => {
    render(
      <BoxList
        pagination={paginationLength}
        filteredBoxes={[]}
        setSelectedBox={() => {}}
      />,
    );
  });

  test("renders the correct number of BoxListItem components", () => {
    const boxes = dummydata;
    render(
      <BoxList
        pagination={paginationLength}
        filteredBoxes={boxes}
        setSelectedBox={mockHandler}
      />,
    );
    const items = screen.getAllByTestId("BoxListItem");
    expect(items.length).toBe(paginationLength);
  });

  test("pagination works correctly", async () => {
    const boxes = dummydata;

    const { getByText, findAllByTestId } = render(
      <BoxList
        pagination={paginationLength}
        filteredBoxes={boxes}
        setSelectedBox={mockHandler}
      />,
    );
    const nextPageButton = getByText("Next");
    const prevPageButton = getByText("Previous");
    const items = screen.getAllByTestId("BoxListItem");
    expect(items.length).toBe(paginationLength);

    // page 1
    let newItems = await findAllByTestId("BoxListItem");
    expect(newItems.length).toBe(paginationLength);
    // boxes aren't sorted by anything, so first is box 1
    expect(newItems[0].textContent).includes("Box 1");

    // page 2
    await user.click(nextPageButton);
    newItems = await findAllByTestId("BoxListItem");
    expect(newItems.length).toBe(paginationLength);
    expect(newItems[0].textContent).includes("Box 11");

    // page 3
    await user.click(nextPageButton);
    newItems = await findAllByTestId("BoxListItem");
    // remove first two pages, 10 per page
    expect(newItems.length).toBe(boxes.length - paginationLength * 2);
    expect(newItems[0].textContent).includes("Box 21");

    // you can go to prev page, page 2
    await user.click(prevPageButton);
    newItems = await findAllByTestId("BoxListItem");
    expect(newItems.length).toBe(paginationLength);
    expect(newItems[0].textContent).includes("Box 11");
  });
});
