import { LoginInterface } from '@interfaces/login-interface';

export interface LoginResponseInterface {
    id      : number;
    name    : string;
    isAdmin : boolean;
    token   : string;
}
