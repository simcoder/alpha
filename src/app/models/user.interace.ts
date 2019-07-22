import { Role } from '../enums/role.enum';

export interface PMAUser {
    uid?: string,
    email?: string,
    role?: Role,
    name?: string,
    displayName?: string,
    photoURL?: string,
    providerId?:string,
    residentId?: string;
} 