export interface Box {
  id: string;
  width: number;
  height: number;
  depth: number;
  comment?: string;
  addedAt: string;
  modifiedAt?: string;
}

export type SortType =
  | "modifiedNewest"
  | "modifiedOldest"
  | "addedNewest"
  | "addedOldest"
  | "idAscending"
  | "idDescending";
