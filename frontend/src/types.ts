export interface Box {
  id: string;
  height: number;
  depth: number;
  length: number;
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
