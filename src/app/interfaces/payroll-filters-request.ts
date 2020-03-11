export interface PayrollFiltersRequest {
    page            : number;
    id              : number;
    employerId      : number;
    emailEmployer   : string;
    nameEmployer    : string;
    month           : number;
    year            : number;
    limit           : number;
    status          : number;
}
