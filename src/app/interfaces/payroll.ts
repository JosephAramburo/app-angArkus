export interface Payroll {
    id                  : number;
    employerId          : number;
    receiptPeriod       : number;
    year                : number;
    baseIncome          : number;        
    totalPerception     : number;
    savingMoney         : number;
    breakfastDeduction  : number;
    gasolineCard        : number;
    totalDeduction      : number;
    deposit             : number;
    name                ?: string;
    email               ?: string;
    status              ?: number;
    statusEmployer      ?: number;
}
