export interface EmployerInterface {
    id                  : number;
    email               : string;
    password            : string;
    role                : number;
    name                : string;
    lastName            : string;
    motherLastName      : string;
    status              : number;
    admissionDate       : Date;
    baseIncome          : number;
    breakfastDeduction  : number;
    savingsDeduction    : number;
    createdAt           : Date;
    createdBy           : number;
    updatedAt           : Date;
    updatedBy           : number;
}
