import { sortBoxes } from "../src/components/Buttons/sortLogic";
import { describe, expect, test } from "vitest";

import { dummyBoxes3 as dummyBoxes } from "./dummyBoxes";
import { Box } from "../src/types";

describe("sortBoxes", () => {
  // dummyBoxes are from 1 - 5 in id order by default
  test("sorts boxes by ID in ascending order", () => {
    const sortedBoxes = sortBoxes(dummyBoxes, "idAscending");
    expect(sortedBoxes).toEqual(dummyBoxes);
  });

  // dummyBoxes are from 1 - 5 in id order by default
  test("sorts boxes by ID in descending order", () => {
    const sortedBoxes = sortBoxes(dummyBoxes, "idDescending");
    expect(sortedBoxes).toEqual(dummyBoxes.slice().reverse());
  });

  test("sorts boxes by added date in ascending order", () => {
    const sortedBoxes = sortBoxes(dummyBoxes, "addedOldest");
    const expected: Box[] = [
      {
        id: 1,
        width: 10,
        height: 20,
        depth: 30,
        createdAt: "2024-06-19T10:00:00Z",
        updatedAt: "2024-06-19T10:00:00Z",
      },
      {
        id: 2,
        width: 15,
        height: 25,
        depth: 35,
        comment: "This is box number 2",
        createdAt: "2024-06-19T11:00:00Z",
        updatedAt: "2024-06-20T14:00:00Z",
      },
      {
        id: 3,
        width: 20,
        height: 30,
        depth: 40,
        createdAt: "2024-06-19T12:00:00Z",
        updatedAt: "2024-06-20T00:00:00Z",
      },
    ];
    expect(sortedBoxes).toEqual(expected);
  });

  test("sorts boxes by added date in descending order", () => {
    const sortedBoxes = sortBoxes(dummyBoxes, "addedNewest");
    const expected: Box[] = [
      {
        id: 3,
        width: 20,
        height: 30,
        depth: 40,
        createdAt: "2024-06-19T12:00:00Z",
        updatedAt: "2024-06-20T00:00:00Z",
      },
      {
        id: 2,
        width: 15,
        height: 25,
        depth: 35,
        comment: "This is box number 2",
        createdAt: "2024-06-19T11:00:00Z",
        updatedAt: "2024-06-20T14:00:00Z",
      },
      {
        id: 1,
        width: 10,
        height: 20,
        depth: 30,
        createdAt: "2024-06-19T10:00:00Z",
        updatedAt: "2024-06-19T10:00:00Z",
      },
    ];
    expect(sortedBoxes).toEqual(expected);
  });

  test("sorts boxes by modified date in ascending order", () => {
    const sortedBoxes = sortBoxes(dummyBoxes, "modifiedOldest");
    const expected: Box[] = [
      {
        id: 1,
        width: 10,
        height: 20,
        depth: 30,
        createdAt: "2024-06-19T10:00:00Z",
        updatedAt: "2024-06-19T10:00:00Z",
      },
      {
        id: 3,
        width: 20,
        height: 30,
        depth: 40,
        createdAt: "2024-06-19T12:00:00Z",
        updatedAt: "2024-06-20T00:00:00Z",
      },
      {
        id: 2,
        width: 15,
        height: 25,
        depth: 35,
        comment: "This is box number 2",
        createdAt: "2024-06-19T11:00:00Z",
        updatedAt: "2024-06-20T14:00:00Z",
      },
    ];
    expect(sortedBoxes).toEqual(expected);
  });

  test("sorts boxes by modified date in descending order", () => {
    const sortedBoxes = sortBoxes(dummyBoxes, "modifiedNewest");
    const expected: Box[] = [
      {
        id: 2,
        width: 15,
        height: 25,
        depth: 35,
        comment: "This is box number 2",
        createdAt: "2024-06-19T11:00:00Z",
        updatedAt: "2024-06-20T14:00:00Z",
      },
      {
        id: 3,
        width: 20,
        height: 30,
        depth: 40,
        createdAt: "2024-06-19T12:00:00Z",
        updatedAt: "2024-06-20T00:00:00Z",
      },
      {
        id: 1,
        width: 10,
        height: 20,
        depth: 30,
        createdAt: "2024-06-19T10:00:00Z",
        updatedAt: "2024-06-19T10:00:00Z",
      },
    ];
    expect(sortedBoxes).toEqual(expected);
  });
});
