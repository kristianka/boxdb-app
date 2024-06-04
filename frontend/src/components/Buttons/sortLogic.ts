import { Box, SortType } from "../../types";

export const sortBoxes = (boxes: Box[], sort: SortType) => {
  return [...boxes].sort((a, b) => {
    // Use modifiedAt if available, otherwise fall back to addedAt
    const aDate = a.updatedAt ? new Date(a.updatedAt) : new Date(a.createdAt);
    const bDate = b.updatedAt ? new Date(b.updatedAt) : new Date(b.createdAt);

    switch (sort) {
      case "modifiedNewest":
        return bDate.getTime() - aDate.getTime();
      case "modifiedOldest":
        return aDate.getTime() - bDate.getTime();
      case "addedNewest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "addedOldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "idAscending":
        return a.id.localeCompare(b.id);
      case "idDescending":
        return b.id.localeCompare(a.id);
      default:
        return 0;
    }
  });
};
