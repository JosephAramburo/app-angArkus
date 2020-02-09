import { LoginInterface } from '@interfaces/login-interface';

export interface LoginResponseInterface {
    user    : LoginInterface;
    token   : string;
}
