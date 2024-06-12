import { Box } from "./types";

export const boxes: Box[] = [
  {
    id: 1,
    width: 10,
    height: 20,
    depth: 30,
    comment: "This is a comment",
    createdAt: "2021-09-01T12:00:00.000Z",
    updatedAt: "2021-09-01T12:00:00.000Z",
  },
  {
    id: 2,
    width: 20,
    height: 30,
    depth: 40,
    comment: "Edited",
    createdAt: "2021-09-02T12:00:00.000Z",
    updatedAt: "2021-09-02T12:10:00.000Z",
  },
  {
    id: 3,
    width: 30,
    height: 40,
    depth: 50,
    comment: "This is another comment",
    createdAt: "2021-09-03T12:00:00.000Z",
    updatedAt: "2021-09-03T12:00:00.000Z",
  },
  {
    id: 4,
    width: 40,
    height: 50,
    depth: 60,
    createdAt: "2021-09-04T12:00:00.000Z",
    updatedAt: "2021-09-04T12:00:00.000Z",
  },
  {
    id: 5,
    width: 50,
    height: 60,
    depth: 70,
    comment: "This is the last comment, edited",
    createdAt: "2021-09-05T12:00:00.000Z",
    updatedAt: "2021-09-05T12:10:00.000Z",
  },
];
