import { User } from '../shared/interfaces';
import * as fromRoute from '../state/app.state'
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, UserActionTypes } from './user.actions';

export interface State extends fromRoute.State {
    users: UserState;
}

export interface UserState {
    filterBy: string;
    currentUser: User;
    users: User[];
}

const initialState: UserState = {
    filterBy: "Active",
    currentUser: null,
    users: []
}

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getFilterBy = createSelector(
    getUserFeatureState,
    state => state.filterBy
);

export function reducer(state = initialState, action: UserActions): UserState {
    switch (action.type) {
        case UserActionTypes.FilterBy:
            return {
                ...state,
                filterBy: action.payload
            }

        case UserActionTypes.SetCurrentUser:
            return {
                ...state,
                currentUser: { ...action.payload }
            }
        case UserActionTypes.ClearCurrentUser:
            return {
                ...state,
                currentUser: null
            }
        case UserActionTypes.InitializeCurrentUser:
            return {
                ...state,
                currentUser: { userId: 0, userFirstName: '', userLastName: '', userUserName: '', userEmail: '', userActive: true, userRoles: null }
            }
        default: return state;
    }
}