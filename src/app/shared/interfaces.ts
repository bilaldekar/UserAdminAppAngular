
export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    active: boolean;
    roles? : Role[];
}


export interface Role {
    roleId?: number;
    roleDescription: string;
    state?: boolean;
}