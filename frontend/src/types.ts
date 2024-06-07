export interface Box {
  id: number;
  width: number;
  height: number;
  depth: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BoxInput {
  width: number;
  height: number;
  depth: number;
  comment?: string;
}

export type SortType =
  | "modifiedNewest"
  | "modifiedOldest"
  | "addedNewest"
  | "addedOldest"
  | "idAscending"
  | "idDescending";
