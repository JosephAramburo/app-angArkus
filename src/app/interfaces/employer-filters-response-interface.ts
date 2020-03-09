import { EmployerInterface } from '@interfaces/employer-interface';

export interface EmployerFiltersResponseInterface {
    employers   : EmployerInterface[];
    page        : number;
    count       : number;
}
