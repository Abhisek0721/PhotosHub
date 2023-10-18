export interface SignupInterface {
    name: string;
    email: string;
    password: string;
}

export interface SignupResponse {
    status: boolean;
    message: string;
}