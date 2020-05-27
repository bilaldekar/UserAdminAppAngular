import { Action } from '@ngrx/store';
import { User } from '../shared/interfaces';

// enum type
export enum UserActionTypes {
    FilterBy = '[User] Filter By',
    SetCurrentUser = '[User] Set Current User',
    ClearCurrentUser = '[User] Clear Current User',
    InitializeCurrentUser = '[User] Initialize Current User'
}

// Action Creators
export class FilterBy implements Action {
    readonly type = UserActionTypes.FilterBy;

    constructor(public payload: string) { }
}

export class SetCurrentUser implements Action {
    readonly type = UserActionTypes.SetCurrentUser;

    constructor(public payload: User) { }
}

export class ClearCurrentUser implements Action {
    readonly type = UserActionTypes.ClearCurrentUser;
}

export class InitializeCurrentUser implements Action {
    readonly type = UserActionTypes.InitializeCurrentUser;
}

//union type
export type UserActions = FilterBy
    | SetCurrentUser
    | ClearCurrentUser
    | InitializeCurrentUser;

