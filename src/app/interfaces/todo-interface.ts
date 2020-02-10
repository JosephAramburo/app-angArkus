export interface TodoInterface {
    _id         ?: string;
    description : string;
    status      : boolean;
    file        : string | ArrayBuffer;
    typeFile    : string;
    createdAt   ?: Date;
    updatedAt   ?: Date;
    page        ?: number;
}
