"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCorporateStatistics = exports.getAllAdminStatistics = void 0;
var index_1 = require("../prisma/index");
var logger_1 = require("../utils/logger");
var statusCode_1 = require("../utils/statusCode");
var getAllAdminStatistics = function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var responseObj_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 4]);
                responseObj_1 = {
                    userCount: 0,
                    businessUserCount: 0,
                    totalEndUsers: 0,
                    totalProducts: 0,
                    totalAssets: 0,
                    totalQRGenerated: 0,
                    totalQRConsumed: 0,
                    totalIndustryTypes: 0,
                    totalSourceTypes: 0
                };
                return [4, index_1.prisma.user
                        .count({
                        where: {
                            role: 1
                        }
                    })
                        .then(function (user) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    responseObj_1.userCount = user;
                                    return [4, index_1.prisma.user
                                            .count({
                                            where: {
                                                role: 2
                                            }
                                        })
                                            .then(function (corp) { return __awaiter(void 0, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        responseObj_1.businessUserCount = corp;
                                                        return [4, index_1.prisma.user.count({}).then(function (endUsers) { return __awaiter(void 0, void 0, void 0, function () {
                                                                return __generator(this, function (_a) {
                                                                    switch (_a.label) {
                                                                        case 0:
                                                                            responseObj_1.totalEndUsers = endUsers;
                                                                            return [4, index_1.prisma.product.count({}).then(function (products) { return __awaiter(void 0, void 0, void 0, function () {
                                                                                    return __generator(this, function (_a) {
                                                                                        switch (_a.label) {
                                                                                            case 0:
                                                                                                responseObj_1.totalProducts = products;
                                                                                                return [4, index_1.prisma.asset.count({}).then(function (assets) { return __awaiter(void 0, void 0, void 0, function () {
                                                                                                        return __generator(this, function (_a) {
                                                                                                            switch (_a.label) {
                                                                                                                case 0:
                                                                                                                    responseObj_1.totalAssets = assets;
                                                                                                                    return [4, index_1.prisma.qRCode.count({}).then(function (qrCodes) { return __awaiter(void 0, void 0, void 0, function () {
                                                                                                                            return __generator(this, function (_a) {
                                                                                                                                switch (_a.label) {
                                                                                                                                    case 0:
                                                                                                                                        responseObj_1.totalQRGenerated = qrCodes;
                                                                                                                                        return [4, index_1.prisma.usedQRCode
                                                                                                                                                .count({})
                                                                                                                                                .then(function (userQrCodes) { return __awaiter(void 0, void 0, void 0, function () {
                                                                                                                                                return __generator(this, function (_a) {
                                                                                                                                                    switch (_a.label) {
                                                                                                                                                        case 0:
                                                                                                                                                            responseObj_1.totalQRConsumed = userQrCodes;
                                                                                                                                                            return [4, index_1.prisma.industryType
                                                                                                                                                                    .count({})
                                                                                                                                                                    .then(function (industryTypes) { return __awaiter(void 0, void 0, void 0, function () {
                                                                                                                                                                    return __generator(this, function (_a) {
                                                                                                                                                                        switch (_a.label) {
                                                                                                                                                                            case 0:
                                                                                                                                                                                responseObj_1.totalIndustryTypes = industryTypes;
                                                                                                                                                                                return [4, index_1.prisma.sourceType
                                                                                                                                                                                        .count({})
                                                                                                                                                                                        .then(function (sourceTypes) {
                                                                                                                                                                                        responseObj_1.totalSourceTypes = sourceTypes;
                                                                                                                                                                                        return res.status(statusCode_1.statusCode.OK).json({
                                                                                                                                                                                            message: 'Statistics fetched Successfully!',
                                                                                                                                                                                            data: responseObj_1
                                                                                                                                                                                        });
                                                                                                                                                                                    })
                                                                                                                                                                                        .catch(function (err) {
                                                                                                                                                                                        (0, logger_1.loggerUtil)(err, 'ERROR');
                                                                                                                                                                                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                                                                                                                                                                            error: 'Failed to fetch statistics data!'
                                                                                                                                                                                        });
                                                                                                                                                                                    })];
                                                                                                                                                                            case 1:
                                                                                                                                                                                _a.sent();
                                                                                                                                                                                return [2];
                                                                                                                                                                        }
                                                                                                                                                                    });
                                                                                                                                                                }); })];
                                                                                                                                                        case 1:
                                                                                                                                                            _a.sent();
                                                                                                                                                            return [2];
                                                                                                                                                    }
                                                                                                                                                });
                                                                                                                                            }); })];
                                                                                                                                    case 1:
                                                                                                                                        _a.sent();
                                                                                                                                        return [2];
                                                                                                                                }
                                                                                                                            });
                                                                                                                        }); })];
                                                                                                                case 1:
                                                                                                                    _a.sent();
                                                                                                                    return [2];
                                                                                                            }
                                                                                                        });
                                                                                                    }); })];
                                                                                            case 1:
                                                                                                _a.sent();
                                                                                                return [2];
                                                                                        }
                                                                                    });
                                                                                }); })];
                                                                        case 1:
                                                                            _a.sent();
                                                                            return [2];
                                                                    }
                                                                });
                                                            }); })];
                                                    case 1: return [4, _a.sent()];
                                                    case 2:
                                                        _a.sent();
                                                        return [2];
                                                }
                                            });
                                        }); })];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        });
                    }); })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.INTERNAL_SERVER_ERROR).json({
                            message: 'Failed to fetch the statistics!'
                        });
                    })];
            case 1:
                _a.sent();
                return [3, 4];
            case 2:
                err_1 = _a.sent();
                (0, logger_1.loggerUtil)(err_1, 'ERROR');
                return [3, 4];
            case 3:
                (0, logger_1.loggerUtil)("Get User By Id API Called!");
                return [7];
            case 4: return [2];
        }
    });
}); };
exports.getAllAdminStatistics = getAllAdminStatistics;
var getAllCorporateStatistics = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var responseObj_2, id_1, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 4]);
                responseObj_2 = {
                    availablePoints: 0,
                    totalPoints: 0,
                    totalProducts: 0,
                    totalQRGenerated: 0,
                    totalQRConsumed: 0
                };
                id_1 = req.auth._id;
                return [4, index_1.prisma.user
                        .findUnique({
                        where: {
                            id: id_1
                        }
                    })
                        .then(function (user) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    responseObj_2.availablePoints = (user === null || user === void 0 ? void 0 : user.points) || 0;
                                    responseObj_2.totalPoints = (user === null || user === void 0 ? void 0 : user.totalPoints) || 0;
                                    return [4, index_1.prisma.product
                                            .count({
                                            where: {
                                                userId: id_1
                                            }
                                        })
                                            .then(function (products) { return __awaiter(void 0, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        responseObj_2.totalProducts = products;
                                                        return [4, index_1.prisma.qRCode
                                                                .count({
                                                                where: {
                                                                    userId: id_1
                                                                }
                                                            })
                                                                .then(function (qrCodes) { return __awaiter(void 0, void 0, void 0, function () {
                                                                return __generator(this, function (_a) {
                                                                    switch (_a.label) {
                                                                        case 0:
                                                                            responseObj_2.totalQRGenerated = qrCodes;
                                                                            return [4, index_1.prisma.usedQRCode
                                                                                    .count({
                                                                                    where: {
                                                                                        userId: id_1
                                                                                    }
                                                                                })
                                                                                    .then(function (userQrCodes) { return __awaiter(void 0, void 0, void 0, function () {
                                                                                    return __generator(this, function (_a) {
                                                                                        responseObj_2.totalQRConsumed = userQrCodes;
                                                                                        return [2, res.status(statusCode_1.statusCode.OK).json({
                                                                                                message: 'Statistics fetched Successfully!',
                                                                                                data: responseObj_2
                                                                                            })];
                                                                                    });
                                                                                }); })
                                                                                    .catch(function (err) {
                                                                                    (0, logger_1.loggerUtil)(err, 'ERROR');
                                                                                    return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                                                                        error: 'Failed to fetch statistics data!'
                                                                                    });
                                                                                })];
                                                                        case 1:
                                                                            _a.sent();
                                                                            return [2];
                                                                    }
                                                                });
                                                            }); })];
                                                    case 1:
                                                        _a.sent();
                                                        return [2];
                                                }
                                            });
                                        }); })];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        });
                    }); })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.INTERNAL_SERVER_ERROR).json({
                            message: 'Failed to fetch the statistics!'
                        });
                    })];
            case 1:
                _a.sent();
                return [3, 4];
            case 2:
                err_2 = _a.sent();
                (0, logger_1.loggerUtil)(err_2, 'ERROR');
                return [3, 4];
            case 3:
                (0, logger_1.loggerUtil)("Get User By Id API Called!");
                return [7];
            case 4: return [2];
        }
    });
}); };
exports.getAllCorporateStatistics = getAllCorporateStatistics;
//# sourceMappingURL=statistics.js.map