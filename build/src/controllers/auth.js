"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = exports.updateUserPoints = exports.approveCorporateUser = exports.update = exports.signout = exports.signin = exports.signup = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var express_validator_1 = require("express-validator");
var lodash_1 = require("lodash");
var auth_1 = require("../helpers/auth");
var index_1 = require("../prisma/index");
var logger_1 = require("../utils/logger");
var statusCode_1 = require("../utils/statusCode");
var enum_1 = require("../@types/enum");
var mailer_1 = require("../helpers/mailer");
var signup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, name, email, _b, phoneNumber, password, otherFields, userType, err_1;
    var _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req) || [];
                if (!errors.isEmpty()) {
                    return [2, res.status(statusCode_1.statusCode.WRONG_ENTITY).json({
                            error: (_c = errors.array()[0]) === null || _c === void 0 ? void 0 : _c.msg
                        })];
                }
                _a = req.body, name = _a.name, email = _a.email, _b = _a.phoneNumber, phoneNumber = _b === void 0 ? null : _b, password = _a.password;
                otherFields = (0, lodash_1.omit)(req.body, 'password');
                userType = (_d = req.query) === null || _d === void 0 ? void 0 : _d.userType;
                _g.label = 1;
            case 1:
                _g.trys.push([1, 3, 4, 5]);
                return [4, index_1.prisma.user
                        .create({
                        data: __assign({ name: name, email: email, phoneNumber: phoneNumber, gender: ((_e = req.body) === null || _e === void 0 ? void 0 : _e.gender) || enum_1.Gender.MALE, dateOfBirth: ((_f = req.body) === null || _f === void 0 ? void 0 : _f.dataOfBirth) || '', encrypted_password: (0, auth_1.hashPassword)(password, process.env.SALT || ''), role: userType && userType === '2' ? 2 : 1 }, otherFields)
                    })
                        .then(function (user) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'User Signed Up, Successfully!',
                            data: user
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Failed to add user in DB!'
                        });
                    })];
            case 2:
                _g.sent();
                return [3, 5];
            case 3:
                err_1 = _g.sent();
                (0, logger_1.loggerUtil)(err_1, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Sign up API called by user - " + email);
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.signup = signup;
var signin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, email, password, err_2;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req) || [];
                if (!errors.isEmpty()) {
                    return [2, res.status(statusCode_1.statusCode.WRONG_ENTITY).json({
                            error: (_b = errors.array()[0]) === null || _b === void 0 ? void 0 : _b.msg
                        })];
                }
                _a = req.body, email = _a.email, password = _a.password;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, 4, 5]);
                return [4, index_1.prisma.user
                        .findUnique({
                        where: {
                            email: email
                        }
                    })
                        .then(function (user) {
                        if (!user) {
                            return res.status(statusCode_1.statusCode.NOT_FOUND).json({
                                error: "User doesn't exist!"
                            });
                        }
                        if (!(0, auth_1.authenticate)(password, process.env.SALT || '', user.encrypted_password)) {
                            return res.status(statusCode_1.statusCode.UNAUTHORIZED).json({
                                error: 'Oops!, E-mail or Password is  incorrect!'
                            });
                        }
                        var expiryTime = new Date();
                        expiryTime.setMonth(expiryTime.getMonth() + 6);
                        var exp = expiryTime.getTime() / 1000;
                        var token = jsonwebtoken_1.default.sign({ _id: user.id, exp: exp }, process.env.SECRET || '');
                        res.cookie('Token', token, {
                            expires: new Date(Date.now() + 900000),
                            httpOnly: true
                        });
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'User Logged in Successfully!',
                            token: token,
                            data: user
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.INTERNAL_SERVER_ERROR).json({
                            error: 'Login failed!'
                        });
                    })];
            case 2:
                _c.sent();
                return [3, 5];
            case 3:
                err_2 = _c.sent();
                (0, logger_1.loggerUtil)(err_2, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Sign in API called by user - " + email);
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.signin = signin;
var signout = function (res) {
    res.clearCookie('Token');
    res.status(statusCode_1.statusCode.OK).json({
        message: 'User Signed Out Sucessfully!'
    });
};
exports.signout = signout;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, reqBody, _a, _b, email, _c, password, err_3;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                userId = +(req.params.userId || '0');
                reqBody = req.body;
                _a = req.body, _b = _a.email, email = _b === void 0 ? '' : _b, _c = _a.password, password = _c === void 0 ? '' : _c;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, 4, 5]);
                if (!(0, lodash_1.isEmpty)(email) || !(0, lodash_1.isEmpty)(password)) {
                    return [2, res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Cannot update email or password'
                        })];
                }
                return [4, index_1.prisma.user
                        .update({
                        where: {
                            id: userId
                        },
                        data: reqBody
                    })
                        .then(function (user) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'User Updated Successfully',
                            data: user
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.INTERNAL_SERVER_ERROR).json({
                            error: 'Login failed!'
                        });
                    })];
            case 2:
                _d.sent();
                return [3, 5];
            case 3:
                err_3 = _d.sent();
                (0, logger_1.loggerUtil)(err_3, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Update API called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.update = update;
var approveCorporateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 4]);
                userId = +(req.params.userId || '0');
                return [4, index_1.prisma.user
                        .update({
                        where: {
                            id: userId
                        },
                        data: {
                            isApproved: true
                        }
                    })
                        .then(function (user) {
                        (0, mailer_1.mailer)(user.email, 'Congratulations You have been Approved!', 'You Have Been Approvedr', "<!DOCTYPE html>\n\t\t\t\t\t<html xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" lang=\"en\">\n\t\t\t\t\t\n\t\t\t\t\t<head>\n\t\t\t\t\t\t<title></title>\n\t\t\t\t\t\t<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n\t\t\t\t\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n\t\t\t\t\t\t<!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->\n\t\t\t\t\t\t<!--[if !mso]><!-->\n\t\t\t\t\t\t<link href=\"https://fonts.googleapis.com/css?family=Droid+Serif\" rel=\"stylesheet\" type=\"text/css\">\n\t\t\t\t\t\t<link href=\"https://fonts.googleapis.com/css?family=Abril+Fatface\" rel=\"stylesheet\" type=\"text/css\">\n\t\t\t\t\t\t<!--<![endif]-->\n\t\t\t\t\t\t<style>\n\t\t\t\t\t\t\t* {\n\t\t\t\t\t\t\t\tbox-sizing: border-box;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\t\t\tbody {\n\t\t\t\t\t\t\t\tmargin: 0;\n\t\t\t\t\t\t\t\tpadding: 0;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\t\t\ta[x-apple-data-detectors] {\n\t\t\t\t\t\t\t\tcolor: inherit !important;\n\t\t\t\t\t\t\t\ttext-decoration: inherit !important;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\t\t\t#MessageViewBody a {\n\t\t\t\t\t\t\t\tcolor: inherit;\n\t\t\t\t\t\t\t\ttext-decoration: none;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\t\t\tp {\n\t\t\t\t\t\t\t\tline-height: inherit\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\t\t\t.desktop_hide,\n\t\t\t\t\t\t\t.desktop_hide table {\n\t\t\t\t\t\t\t\tmso-hide: all;\n\t\t\t\t\t\t\t\tdisplay: none;\n\t\t\t\t\t\t\t\tmax-height: 0px;\n\t\t\t\t\t\t\t\toverflow: hidden;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\t\t\t@media (max-width:700px) {\n\t\t\t\t\t\t\t\t.desktop_hide table.icons-inner {\n\t\t\t\t\t\t\t\t\tdisplay: inline-block !important;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\t\t\t\t.icons-inner {\n\t\t\t\t\t\t\t\t\ttext-align: center;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\t\t\t\t.icons-inner td {\n\t\t\t\t\t\t\t\t\tmargin: 0 auto;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\t\t\t\t.image_block img.big,\n\t\t\t\t\t\t\t\t.row-content {\n\t\t\t\t\t\t\t\t\twidth: 100% !important;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\t\t\t\t.mobile_hide {\n\t\t\t\t\t\t\t\t\tdisplay: none;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\t\t\t\t.stack .column {\n\t\t\t\t\t\t\t\t\twidth: 100%;\n\t\t\t\t\t\t\t\t\tdisplay: block;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\t\t\t\t.mobile_hide {\n\t\t\t\t\t\t\t\t\tmin-height: 0;\n\t\t\t\t\t\t\t\t\tmax-height: 0;\n\t\t\t\t\t\t\t\t\tmax-width: 0;\n\t\t\t\t\t\t\t\t\toverflow: hidden;\n\t\t\t\t\t\t\t\t\tfont-size: 0px;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\t\t\t\t.desktop_hide,\n\t\t\t\t\t\t\t\t.desktop_hide table {\n\t\t\t\t\t\t\t\t\tdisplay: table !important;\n\t\t\t\t\t\t\t\t\tmax-height: none !important;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t</style>\n\t\t\t\t\t</head>\n\t\t\t\t\t\n\t\t\t\t\t<body style=\"background-color: #b8f6c2; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;\">\n\t\t\t\t\t\t<table class=\"nl-container\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #b8f6c2;\">\n\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t<table class=\"row row-1\" align=\"center\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table class=\"row-content stack\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;\" width=\"680\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"column column-1\" width=\"100%\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table class=\"image_block\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td style=\"padding-bottom:20px;padding-top:10px;width:100%;padding-right:0px;padding-left:0px;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div align=\"center\" style=\"line-height:10px\"><a href=\"www.example.com\" target=\"_blank\" style=\"outline:none\" tabindex=\"-1\"><img class=\"big\" src=\"https://raw.githubusercontent.com/IamLucidDreamer/greenbuilt-web-crm-admin/main/src/assets/logoGreenbuilt.png\" style=\"display: block; height: auto; border: 0; width: 408px; max-width: 100%;\" width=\"408\" alt=\"Company Logo\" title=\"Company Logo\"></a></div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t\t<table class=\"row row-2\" align=\"center\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-position: center top;\">\n\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table class=\"row-content stack\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #5091c4; color: #000000; width: 680px;\" width=\"680\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"column column-1\" width=\"100%\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table class=\"image_block\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td style=\"width:100%;padding-right:0px;padding-left:0px;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div align=\"center\" style=\"line-height:10px\"><a href=\"www.example.com\" target=\"_blank\" style=\"outline:none\" tabindex=\"-1\"><img class=\"big\" src=\"https://d1oco4z2z1fhwp.cloudfront.net/templates/default/6761/08bd485f-3aa2-4f51-b1d7-338ed3debb55.png\" style=\"display: block; height: auto; border: 0; width: 679px; max-width: 100%;\" width=\"679\" alt=\"clouds\" title=\"clouds\"></a></div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table class=\"heading_block\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td style=\"padding-bottom:10px;text-align:center;width:100%;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h1 style=\"margin: 0; color: #e3f2ff; direction: ltr; font-family: 'Abril Fatface', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 55px; font-weight: 400; letter-spacing: 1px; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;\"><span class=\"tinyMce-placeholder\">Hurray!</span></h1>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table class=\"heading_block\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td style=\"padding-bottom:10px;text-align:center;width:100%;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h1 style=\"margin: 0; color: #e3f2ff; direction: ltr; font-family: 'Abril Fatface', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 45px; font-weight: 400; letter-spacing: 1px; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;\"><span class=\"tinyMce-placeholder\">You have been Approved.</span></h1>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table class=\"paragraph_block\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td style=\"padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div style=\"color:#e3f2ff;direction:ltr;font-family:'Droid Serif', Georgia, Times, 'Times New Roman', serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:center;mso-line-height-alt:24px;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p style=\"margin: 0;\">Thansk for Becoming a member. It's no secret our planet is hurting due to human activity. Earth Day was created to help individuals and business do their part to help protect and preserve it. To help you find some ways you can help save our planet, we put together a list of things you can easily do on Earth Day (and every day after) to reduce your carbon footprint.</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table class=\"image_block\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td style=\"width:100%;padding-right:0px;padding-left:0px;padding-top:30px;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div align=\"center\" style=\"line-height:10px\"><a href=\"www.example.com\" target=\"_blank\" style=\"outline:none\" tabindex=\"-1\"><img class=\"big\" src=\"https://d1oco4z2z1fhwp.cloudfront.net/templates/default/6761/4fc76e21-aecd-4b3a-806c-671e16757f2e.png\" style=\"display: block; height: auto; border: 0; width: 680px; max-width: 100%;\" width=\"680\" alt=\"earth with clouds\" title=\"earth with clouds\"></a></div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t\t<table class=\"row row-3\" align=\"center\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table class=\"row-content stack\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;\" width=\"680\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"column column-1\" width=\"100%\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table class=\"empty_block\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div></div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t\t<table class=\"row row-4\" align=\"center\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table class=\"row-content stack\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;\" width=\"680\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"column column-1\" width=\"100%\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table class=\"icons_block\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td style=\"vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td style=\"vertical-align: middle; text-align: center;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--[if vml]><table align=\"left\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;\"><![endif]-->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--[if !vml]><!-->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t</table><!-- End -->\n\t\t\t\t\t</body>\n\t\t\t\t\t\n\t\t\t\t\t</html>", '', res);
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Coporate User has been Approved Successfully',
                            data: user
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.INTERNAL_SERVER_ERROR).json({
                            error: 'Coporate User Approval failed!'
                        });
                    })];
            case 1:
                _a.sent();
                return [3, 4];
            case 2:
                err_4 = _a.sent();
                (0, logger_1.loggerUtil)(err_4, 'ERROR');
                return [3, 4];
            case 3:
                (0, logger_1.loggerUtil)("Approve Corporate User API called!");
                return [7];
            case 4: return [2];
        }
    });
}); };
exports.approveCorporateUser = approveCorporateUser;
var updateUserPoints = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, points_1, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 4]);
                userId = +(req.params.userId || '0');
                points_1 = typeof req.body.points === 'string'
                    ? +req.body.points
                    : req.body.points || 0;
                return [4, index_1.prisma.user
                        .findUnique({
                        where: {
                            id: userId
                        }
                    })
                        .then(function (user) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, index_1.prisma.user
                                        .update({
                                        where: {
                                            id: user === null || user === void 0 ? void 0 : user.id
                                        },
                                        data: {
                                            points: ((user === null || user === void 0 ? void 0 : user.points) || 0) + points_1,
                                            totalPoints: ((user === null || user === void 0 ? void 0 : user.totalPoints) || 0) + points_1
                                        }
                                    })
                                        .then(function (data) {
                                        return res.status(statusCode_1.statusCode.OK).json({
                                            message: 'User points updated successfully!',
                                            data: data
                                        });
                                    })
                                        .catch(function (err) {
                                        (0, logger_1.loggerUtil)(err, 'ERROR');
                                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                            error: 'Failed to update user points!'
                                        });
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        });
                    }); })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.NOT_FOUND).json({
                            error: 'No user found!'
                        });
                    })];
            case 1:
                _a.sent();
                return [3, 4];
            case 2:
                err_5 = _a.sent();
                (0, logger_1.loggerUtil)(err_5, 'ERROR');
                return [3, 4];
            case 3:
                (0, logger_1.loggerUtil)("Approve Corporate User API called!");
                return [7];
            case 4: return [2];
        }
    });
}); };
exports.updateUserPoints = updateUserPoints;
var forgotPassword = function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        (0, mailer_1.mailer)('shuklamanasofficial@gmail.com', 'Congratulations You have been Approved!', 'You Have Been Approvedr', "<div style=\"margin : 10px 0px\">Hello User,</div><div style=\"font-weight: bold , font-size:20px\">You have been Approved by the Admin successfully.</div>", '', res)
            .then(function () { return (0, logger_1.loggerUtil)('Hello WOrld'); })
            .catch(function () { return (0, logger_1.loggerUtil)('New Error'); });
        return [2];
    });
}); };
exports.forgotPassword = forgotPassword;
//# sourceMappingURL=auth.js.map