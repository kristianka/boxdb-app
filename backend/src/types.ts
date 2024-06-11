export interface Box {
    id: string;
    width: number;
    height: number;
    depth: number;
    comment?: string;
    createdAt: string;
    updatedAt: string;
}

export interface RouteParams {
    id: string;
}
