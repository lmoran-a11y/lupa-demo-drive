export type UserRole = 'usuario' | 'mecanico' | 'vendedor';

export interface LoginData {
    email: string;
    role: UserRole;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    role: UserRole;
    password: string;
}

export interface UserProfile extends RegisterData {
    id: string;
    isVerified: boolean;
}