export interface TUser {
    name: string;
    email: string;
    role: 'user' | 'admin';
    password: string;
    phone: string;
    address: string;
};

export interface TLogin {
    email: string;
    password: string;
};
