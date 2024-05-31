import { Box, SortType } from "../../types";

export const sortBoxes = (boxes: Box[], sort: SortType) => {
  return [...boxes].sort((a, b) => {
    // Use modifiedAt if available, otherwise fall back to addedAt
    const aDate = a.modifiedAt ? new Date(a.modifiedAt) : new Date(a.addedAt);
    const bDate = b.modifiedAt ? new Date(b.modifiedAt) : new Date(b.addedAt);

    switch (sort) {
      case "modifiedNewest":
        return bDate.getTime() - aDate.getTime();
      case "modifiedOldest":
        return aDate.getTime() - bDate.getTime();
      case "addedNewest":
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      case "addedOldest":
        return new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();
      case "idAscending":
        return a.id.localeCompare(b.id);
      case "idDescending":
        return b.id.localeCompare(a.id);
      default:
        return 0;
    }
  });
};
