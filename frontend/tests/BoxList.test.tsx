import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import BoxList from "../src/components/BoxList/BoxList";
import { dummyBoxes20 } from "./dummyBoxes";

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
        selectedBox={undefined}
      />,
    );
  });

  test("renders the correct number of BoxListItem components", () => {
    const boxes = dummyBoxes20;
    render(
      <BoxList
        pagination={paginationLength}
        filteredBoxes={boxes}
        setSelectedBox={mockHandler}
        selectedBox={undefined}
      />,
    );
    // check if there are 10 items
    const items = screen.getAllByTestId("BoxListItem");
    expect(items.length).toBe(paginationLength);
  });

  test("pagination works correctly", async () => {
    const boxes = dummyBoxes20;

    const { getByText, findAllByTestId } = render(
      <BoxList
        pagination={paginationLength}
        filteredBoxes={boxes}
        setSelectedBox={mockHandler}
        selectedBox={undefined}
      />,
    );

    // page 1

    // check if there are 10 items
    let newItems = await findAllByTestId("BoxListItem");
    expect(newItems.length).toBe(paginationLength);
    // boxes aren't sorted by anything, so first is box 1
    expect(newItems[0].textContent).includes("This is box number 1");

    // buttons
    const nextPageButton = getByText("next");
    const prevPageButton = getByText("previous");

    // page 2
    await user.click(nextPageButton);
    newItems = await findAllByTestId("BoxListItem");
    expect(newItems.length).toBe(paginationLength);
    expect(newItems[0].textContent).includes("This is box number 11");

    // you can go to prev page, page 1
    await user.click(prevPageButton);
    newItems = await findAllByTestId("BoxListItem");
    expect(newItems.length).toBe(paginationLength);
    expect(newItems[0].textContent).includes("This is box number 1");
  });
});
