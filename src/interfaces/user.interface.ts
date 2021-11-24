export interface User {
    id?: string;
    username: string;
    email: string;
    password: string;
    dairyIds: string[] | null;
}