import * as tslib_1 from "tslib";
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActionTypes } from './user.actions';
var initialState = {
    filterBy: "Active",
    currentUser: null,
    users: []
};
var getUserFeatureState = createFeatureSelector('users');
export var getFilterBy = createSelector(getUserFeatureState, function (state) { return state.filterBy; });
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case UserActionTypes.FilterBy:
            return tslib_1.__assign({}, state, { filterBy: action.payload });
        case UserActionTypes.SetCurrentUser:
            return tslib_1.__assign({}, state, { currentUser: tslib_1.__assign({}, action.payload) });
        case UserActionTypes.ClearCurrentUser:
            return tslib_1.__assign({}, state, { currentUser: null });
        case UserActionTypes.InitializeCurrentUser:
            return tslib_1.__assign({}, state, { currentUser: { userId: 0, userFirstName: '', userLastName: '', userUserName: '', userEmail: '', userActive: true, userRoles: null } });
        default: return state;
    }
}
//# sourceMappingURL=user.reducer.js.map