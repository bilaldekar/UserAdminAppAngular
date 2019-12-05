
export interface User {
    userId?: number;
    userFirstName: string;
    userLastName: string;
    userUserName: string;
    userEmail: string;
    userActive: boolean;
    userProfile : Profile;
}


export interface Profile {
    profileId?: number;
    profileDescription: string;
}