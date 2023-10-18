export interface LoginFromInterface {
    email: string;
    password: string
}

export interface LoginResponse {
    auth: boolean;
    message: string;
    token: string;
}