export interface IUser {
    id?: number;
    name: null;
    email: string;
    password: string;
    password_confirmation: string
}
export interface IUserLogin {
    email: string;
    password: string;
}