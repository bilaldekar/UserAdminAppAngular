import { User } from '../shared/interfaces';
import * as fromRoute from '../state/app.state'
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends fromRoute.State {
    login: LoginState;
}

export interface LoginState {
    currentUser: User;
}

const initialState: LoginState = {
    currentUser: null
}

const getLoginFeatureState = createFeatureSelector<LoginState>('login');

export const getCurrentUser = createSelector(
    getLoginFeatureState,
    state => state.currentUser
);

export function reducer(state = initialState, action): LoginState {
    switch (action.type) {
        case 'CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            }

        default: return state;
    }
}