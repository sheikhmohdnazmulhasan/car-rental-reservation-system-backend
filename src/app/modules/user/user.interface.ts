export interface TUser {
    name: string;
    photo: string;
    email: string;
    role: 'user' | 'admin';
    password: string;
    phone: string;
    address: string;
    token: string
};

export interface TLogin {
    email: string;
    password: string;
};
