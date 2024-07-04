export interface TUser {
    name: string;
    email:string;
    role: 'user' | 'admin';
    password: string;
    address: string;
};
