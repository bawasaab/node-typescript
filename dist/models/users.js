"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var ROLES;
(function (ROLES) {
    ROLES[ROLES["ADMIN"] = 0] = "ADMIN";
    ROLES[ROLES["USER"] = 1] = "USER";
})(ROLES || (ROLES = {}));
class User {
    constructor(email, password, role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
exports.User = User;
