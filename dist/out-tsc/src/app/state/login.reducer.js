import * as tslib_1 from "tslib";
import { createFeatureSelector, createSelector } from '@ngrx/store';
var initialState = {
    currentUser: null
};
var getLoginFeatureState = createFeatureSelector('login');
export var getCurrentUser = createSelector(getLoginFeatureState, function (state) { return state.currentUser; });
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case 'CURRENT_USER':
            return tslib_1.__assign({}, state, { currentUser: action.payload });
        default: return state;
    }
}
//# sourceMappingURL=login.reducer.js.map