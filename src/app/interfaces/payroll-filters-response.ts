import { Payroll } from '@interfaces/payroll';

export interface PayrollFiltersResponse {
    count       : number;
    page        : number;
    payrolls    : Payroll[]
}
