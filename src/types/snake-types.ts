export type MatrixIndex = {
    row : number;
    col : number;
};

// this is a different type just for semantic
export type MatrixSize = {
    rows : number;
    cols : number;
};

export type enumBoard = {
    NONE : number;
    BODY : number;
    HEAD : number;
    APPLE : number;
};