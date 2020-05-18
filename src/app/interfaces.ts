
export interface User {
    userId?: number;
    userFirstName: string;
    userLastName: string;
    userUserName: string;
    userEmail: string;
    userActive: boolean;
    userRoles? : Role[];
}


export interface Role {
    roleId?: number;
    roleDescription: string;
    state?: boolean;
}