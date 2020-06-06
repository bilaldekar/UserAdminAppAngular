// enum type
export var UserActionTypes;
(function (UserActionTypes) {
    UserActionTypes["FilterBy"] = "[User] Filter By";
    UserActionTypes["SetCurrentUser"] = "[User] Set Current User";
    UserActionTypes["ClearCurrentUser"] = "[User] Clear Current User";
    UserActionTypes["InitializeCurrentUser"] = "[User] Initialize Current User";
})(UserActionTypes || (UserActionTypes = {}));
// Action Creators
var FilterBy = /** @class */ (function () {
    function FilterBy(payload) {
        this.payload = payload;
        this.type = UserActionTypes.FilterBy;
    }
    return FilterBy;
}());
export { FilterBy };
var SetCurrentUser = /** @class */ (function () {
    function SetCurrentUser(payload) {
        this.payload = payload;
        this.type = UserActionTypes.SetCurrentUser;
    }
    return SetCurrentUser;
}());
export { SetCurrentUser };
var ClearCurrentUser = /** @class */ (function () {
    function ClearCurrentUser() {
        this.type = UserActionTypes.ClearCurrentUser;
    }
    return ClearCurrentUser;
}());
export { ClearCurrentUser };
var InitializeCurrentUser = /** @class */ (function () {
    function InitializeCurrentUser() {
        this.type = UserActionTypes.InitializeCurrentUser;
    }
    return InitializeCurrentUser;
}());
export { InitializeCurrentUser };
//# sourceMappingURL=user.actions.js.map