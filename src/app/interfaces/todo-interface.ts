export interface TodoInterface {
    _id         : string;
    description : string;
    status      : boolean;
    createdAt   ?: Date;
    updatedAt   ?: Date;
}
