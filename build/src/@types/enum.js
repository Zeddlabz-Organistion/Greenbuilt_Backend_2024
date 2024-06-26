"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = exports.IndustryType = exports.BussinessType = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender[Gender["MALE"] = 1] = "MALE";
    Gender[Gender["FEMALE"] = 2] = "FEMALE";
})(Gender = exports.Gender || (exports.Gender = {}));
var BussinessType;
(function (BussinessType) {
    BussinessType["B2B"] = "B2B";
    BussinessType["B2C"] = "B2C";
})(BussinessType = exports.BussinessType || (exports.BussinessType = {}));
var IndustryType;
(function (IndustryType) {
    IndustryType["SPINNING"] = "SPINNING";
    IndustryType["WEAVING"] = "WEAVING";
    IndustryType["KNITTING"] = "KNITTING";
    IndustryType["YARN_PROCESSING"] = "YARN_PROCESSING";
    IndustryType["FABRIC_PROCESSING"] = "FABRIC_PROCESSING";
    IndustryType["GARMENT_MANUFACTURING"] = "GARMENT_MANUFACTURING";
})(IndustryType = exports.IndustryType || (exports.IndustryType = {}));
var UserType;
(function (UserType) {
    UserType[UserType["USER"] = 1] = "USER";
    UserType[UserType["CORPORATEUSER"] = 2] = "CORPORATEUSER";
    UserType[UserType["ADMIN"] = 3] = "ADMIN";
})(UserType = exports.UserType || (exports.UserType = {}));
//# sourceMappingURL=enum.js.map