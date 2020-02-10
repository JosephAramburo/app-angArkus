import { TodoInterface } from '@interfaces/todo-interface';

export interface TodoResponseInterface {
    data : TodoInterface[];
    page : number;
    count : number;
}
