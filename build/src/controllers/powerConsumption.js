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
exports.getAllPowerConsumption = exports.getAllPowerConsumptionByUser = exports.getPowerConsumptionById = exports.deletePowerConsumption = exports.approvePowerConsumption = exports.updateEnergyConsumption = exports.createEnergyConsumption = void 0;
var crud_1 = require("./../helpers/crud");
var formidable_1 = __importDefault(require("formidable"));
var awss3_1 = require("../helpers/awss3");
var fs_1 = __importDefault(require("fs"));
var sharp_1 = __importDefault(require("sharp"));
var index_1 = require("../prisma/index");
var logger_1 = require("../utils/logger");
var statusCode_1 = require("../utils/statusCode");
var lodash_1 = require("lodash");
var logUser_1 = require("../helpers/logUser");
var crud_2 = require("../helpers/crud");
var awss3_2 = require("../helpers/awss3");
var createEnergyConsumption = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, fileName, totalConsumption, totalGreenConsumption, date, month, year, fullDate, existingData, _b, url, key, dataPrisma, queryObj, existingRecord, newRecord, userData, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                userId = +(req.auth._id || '0');
                _c.label = 1;
            case 1:
                _c.trys.push([1, 12, 13, 14]);
                _a = req.body, fileName = _a.fileName, totalConsumption = _a.totalConsumption, totalGreenConsumption = _a.totalGreenConsumption, date = _a.date, month = _a.month, year = _a.year, fullDate = _a.fullDate;
                return [4, index_1.prisma.montlyConsumptionPlan.findMany({
                        where: {
                            userId: userId,
                            month: +month,
                            year: +year
                        }
                    })];
            case 2:
                existingData = _c.sent();
                if (!existingData.length) return [3, 10];
                return [4, (0, awss3_1.getSignedUrlForDocs)('PowerConsumption', fileName, userId)];
            case 3:
                _b = _c.sent(), url = _b.url, key = _b.key;
                dataPrisma = {
                    date: +date || new Date().getDate(),
                    month: +month || new Date().getMonth() + 1,
                    year: +year || new Date().getFullYear(),
                    fullDate: fullDate ? new Date(fullDate) : new Date(),
                    totalConsumption: totalConsumption,
                    totalGreenConsumption: totalGreenConsumption,
                    userId: userId,
                    ebBillLocation: '',
                    location: key
                };
                queryObj = {
                    month: +month,
                    year: +year,
                    userId: userId
                };
                return [4, (0, crud_1.getAllByQuery)(index_1.prisma.powerConsumption, queryObj)];
            case 4:
                existingRecord = _c.sent();
                if (!(existingRecord.length === 0)) return [3, 8];
                return [4, (0, crud_2.create)(index_1.prisma.powerConsumption, dataPrisma)];
            case 5:
                newRecord = _c.sent();
                if (!newRecord) return [3, 7];
                return [4, (0, crud_2.getById)(index_1.prisma.user, 'id', userId)];
            case 6:
                userData = _c.sent();
                (0, logUser_1.loguser)(userData === null || userData === void 0 ? void 0 : userData.id, userData === null || userData === void 0 ? void 0 : userData.name, userData === null || userData === void 0 ? void 0 : userData.role, 'Power consumption data created successfully!', newRecord);
                return [2, res.status(statusCode_1.statusCode.OK).json({
                        message: 'Power consumption data created successfully!',
                        data: newRecord,
                        url: url
                    })];
            case 7: return [3, 9];
            case 8: return [2, res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                    error: 'Power consumption data for this month is already present for the user!'
                })];
            case 9: return [3, 11];
            case 10: return [2, res
                    .status(statusCode_1.statusCode.BAD_REQUEST)
                    .json({ error: 'No Monthly Plan Found for this month.' })];
            case 11: return [3, 14];
            case 12:
                err_1 = _c.sent();
                (0, logger_1.loggerUtil)(err_1, 'ERROR');
                return [2, res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                        error: 'Error while creating Power consumption data'
                    })];
            case 13:
                (0, logger_1.loggerUtil)('Create Power Consumption API Called!');
                return [7];
            case 14: return [2];
        }
    });
}); };
exports.createEnergyConsumption = createEnergyConsumption;
var updateEnergyConsumption = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var powerConsumptionId, userId, form, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                powerConsumptionId = +(req.params.powerConsumptionId || '0');
                userId = req.auth._id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                form = new formidable_1.default.IncomingForm();
                return [4, form.parse(req, function (err, fields, _a) {
                        var file = _a.file;
                        return __awaiter(void 0, void 0, void 0, function () {
                            var data;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (err) {
                                            (0, logger_1.loggerUtil)(err, 'ERROR');
                                            res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                                error: 'Problem with document'
                                            });
                                        }
                                        if (!file) return [3, 1];
                                        if (file.size > 3000000) {
                                            res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                                error: 'File size should be less than 3 MB'
                                            });
                                        }
                                        else {
                                            (0, sharp_1.default)(fs_1.default.readFileSync(file.filepath))
                                                .resize(1000)
                                                .toBuffer()
                                                .then(function (doc) { return __awaiter(void 0, void 0, void 0, function () {
                                                var data;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            data = __assign(__assign({}, fields), { ebBill: doc });
                                                            return [4, (0, crud_2.create)(index_1.prisma.powerConsumption, data)
                                                                    .then(function (data) { return __awaiter(void 0, void 0, void 0, function () {
                                                                    var userData;
                                                                    return __generator(this, function (_a) {
                                                                        switch (_a.label) {
                                                                            case 0: return [4, (0, crud_2.getById)(index_1.prisma.user, 'id', userId)];
                                                                            case 1:
                                                                                userData = _a.sent();
                                                                                (0, logUser_1.loguser)(userData === null || userData === void 0 ? void 0 : userData.id, userData === null || userData === void 0 ? void 0 : userData.name, userData === null || userData === void 0 ? void 0 : userData.role, "Power consumption data updated sucessfully. and power consumption id is " + powerConsumptionId, res);
                                                                                return [2, res.status(statusCode_1.statusCode.OK).json({
                                                                                        message: 'Power consumption data updated sucessfully!',
                                                                                        data: data
                                                                                    })];
                                                                        }
                                                                    });
                                                                }); })
                                                                    .catch(function (err) {
                                                                    (0, logger_1.loggerUtil)(err, 'ERROR');
                                                                    return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                                                        error: 'Error while updating Power consumption data '
                                                                    });
                                                                })];
                                                        case 1:
                                                            _a.sent();
                                                            return [2];
                                                    }
                                                });
                                            }); });
                                        }
                                        return [3, 3];
                                    case 1:
                                        data = __assign({}, fields);
                                        return [4, (0, crud_2.updateById)(index_1.prisma.powerConsumption, data, 'id', powerConsumptionId)
                                                .then(function (data) { return __awaiter(void 0, void 0, void 0, function () {
                                                var userData;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4, (0, crud_2.getById)(index_1.prisma.user, 'id', data.userId)];
                                                        case 1:
                                                            userData = _a.sent();
                                                            (0, logUser_1.loguser)(userData === null || userData === void 0 ? void 0 : userData.id, userData === null || userData === void 0 ? void 0 : userData.name, userData === null || userData === void 0 ? void 0 : userData.role, "Power consumption data updated sucessfully!", res);
                                                            return [2, res.status(statusCode_1.statusCode.OK).json({
                                                                    message: 'Power consumption data updated sucessfully!',
                                                                    data: data
                                                                })];
                                                    }
                                                });
                                            }); })
                                                .catch(function (err) {
                                                (0, logger_1.loggerUtil)(err, 'ERROR');
                                                return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                                    error: 'Error while updating Power consumption data '
                                                });
                                            })];
                                    case 2:
                                        _b.sent();
                                        _b.label = 3;
                                    case 3: return [2];
                                }
                            });
                        });
                    })];
            case 2:
                _a.sent();
                return [3, 5];
            case 3:
                err_2 = _a.sent();
                (0, logger_1.loggerUtil)(err_2, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Create Power Consumption API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.updateEnergyConsumption = updateEnergyConsumption;
var approvePowerConsumption = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userId, userData, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = +(req.params.powerConsumptionId || '0');
                userId = req.auth._id;
                return [4, (0, crud_2.getById)(index_1.prisma.user, 'id', userId)];
            case 1:
                userData = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, 5, 6]);
                return [4, index_1.prisma.powerConsumption
                        .update({
                        where: {
                            id: id
                        },
                        data: {
                            isApproved: true
                        }
                    })
                        .then(function (data) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, index_1.prisma.montlyConsumptionPlan
                                        .findMany({
                                        where: {
                                            userId: data === null || data === void 0 ? void 0 : data.userId,
                                            month: data.month,
                                            year: data.year
                                        }
                                    })
                                        .then(function (monthlyPlans) { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!monthlyPlans.length) return [3, 2];
                                                    return [4, index_1.prisma.user
                                                            .findFirst({
                                                            where: {
                                                                id: data === null || data === void 0 ? void 0 : data.userId
                                                            }
                                                        })
                                                            .then(function (user) { return __awaiter(void 0, void 0, void 0, function () {
                                                            return __generator(this, function (_a) {
                                                                (0, logUser_1.loguser)(userData === null || userData === void 0 ? void 0 : userData.id, userData === null || userData === void 0 ? void 0 : userData.name, userData === null || userData === void 0 ? void 0 : userData.role, "Power consumption  has been approved sucessfully. and user name is " + (user === null || user === void 0 ? void 0 : user.name) + ", id is " + (user === null || user === void 0 ? void 0 : user.id), res);
                                                                res.status(statusCode_1.statusCode.OK).json({
                                                                    message: 'Power consumption  has been approved sucessfully!'
                                                                });
                                                                return [2];
                                                            });
                                                        }); })
                                                            .catch(function (err) {
                                                            (0, logger_1.loggerUtil)(err, 'ERROR');
                                                            res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                                                error: 'Error while approving power consumption plan with source type'
                                                            });
                                                        })];
                                                case 1:
                                                    _a.sent();
                                                    return [3, 3];
                                                case 2:
                                                    res.status(statusCode_1.statusCode.NOT_FOUND).json({
                                                        message: 'No monthly plans found!'
                                                    });
                                                    _a.label = 3;
                                                case 3: return [2];
                                            }
                                        });
                                    }); })];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        });
                    }); })];
            case 3:
                _a.sent();
                return [3, 6];
            case 4:
                err_3 = _a.sent();
                (0, logger_1.loggerUtil)(err_3, 'ERROR');
                return [3, 6];
            case 5:
                (0, logger_1.loggerUtil)("Approve Power Consumption with Source API Called!");
                return [7];
            case 6: return [2];
        }
    });
}); };
exports.approvePowerConsumption = approvePowerConsumption;
var deletePowerConsumption = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var powerConsumptionId, userId, userData_1, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                powerConsumptionId = +(req.params.powerConsumptionId || '0');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, 5, 6]);
                userId = req.auth._id;
                return [4, (0, crud_2.getById)(index_1.prisma.user, 'id', userId)];
            case 2:
                userData_1 = _a.sent();
                return [4, (0, crud_2.deleteById)(index_1.prisma.powerConsumption, 'id', powerConsumptionId)
                        .then(function (data) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            console.log(data);
                            (0, logUser_1.loguser)(userData_1 === null || userData_1 === void 0 ? void 0 : userData_1.id, userData_1 === null || userData_1 === void 0 ? void 0 : userData_1.name, userData_1 === null || userData_1 === void 0 ? void 0 : userData_1.role, 'Power consumption data deleted sucessfully!', res);
                            return [2, res.status(statusCode_1.statusCode.OK).json({
                                    message: 'Power consumption data deleted sucessfully!'
                                })];
                        });
                    }); })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Error while deleting Power consumption data'
                        });
                    })];
            case 3:
                _a.sent();
                return [3, 6];
            case 4:
                err_4 = _a.sent();
                (0, logger_1.loggerUtil)(err_4, 'ERROR');
                return [3, 6];
            case 5:
                (0, logger_1.loggerUtil)("Delete Power consumption API Called!");
                return [7];
            case 6: return [2];
        }
    });
}); };
exports.deletePowerConsumption = deletePowerConsumption;
var getPowerConsumptionById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var powerConsumptionId, data, url, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                powerConsumptionId = +(req.params.powerConsumptionId || '0');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, 5, 6]);
                return [4, (0, crud_2.getById)(index_1.prisma.powerConsumption, 'id', powerConsumptionId)];
            case 2:
                data = _a.sent();
                if ((0, lodash_1.isEmpty)(data)) {
                    return [2, res.status(statusCode_1.statusCode.NOT_FOUND).json({
                            message: 'Power consumption data was not found!'
                        })];
                }
                return [4, (0, awss3_2.getObjectUrl)(data.location)];
            case 3:
                url = _a.sent();
                data.url = url;
                return [2, res.status(statusCode_1.statusCode.OK).json({
                        message: 'Power consumption data fetched successfully!',
                        data: data
                    })];
            case 4:
                err_5 = _a.sent();
                (0, logger_1.loggerUtil)(err_5, 'ERROR');
                return [2, res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                        error: 'Error while fetching power consumption data'
                    })];
            case 5:
                (0, logger_1.loggerUtil)('Get Power consumption API Called!');
                return [7];
            case 6: return [2];
        }
    });
}); };
exports.getPowerConsumptionById = getPowerConsumptionById;
var getAllPowerConsumptionByUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, take, skip, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = +(req.params.userId || '0');
                take = +(req.query.limit || '10'), skip = +(req.query.offset || '0');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_2.getAllById)(index_1.prisma.powerConsumption, 'userId', userId, take, skip)
                        .then(function (data) {
                        if ((0, lodash_1.isEmpty)(data)) {
                            return res.status(statusCode_1.statusCode.NOT_FOUND).json({
                                message: 'Power consumption data was found!'
                            });
                        }
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'User Power consumption data fetched sucessfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Error while fetching user Power consumption data'
                        });
                    })];
            case 2:
                _a.sent();
                return [3, 5];
            case 3:
                err_6 = _a.sent();
                (0, logger_1.loggerUtil)(err_6, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Get user Power consumption API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getAllPowerConsumptionByUser = getAllPowerConsumptionByUser;
var getAllPowerConsumption = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var take, skip, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                take = +(req.query.limit || '10'), skip = +(req.query.offset || '0');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, index_1.prisma.powerConsumption
                        .findMany({ include: { user: true }, take: take, skip: skip })
                        .then(function (data) {
                        if ((0, lodash_1.isEmpty)(data)) {
                            return res.status(statusCode_1.statusCode.NOT_FOUND).json({
                                message: 'Power consumption data was found!'
                            });
                        }
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Power consumption data fetched sucessfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Error while fetching Power consumption data'
                        });
                    })];
            case 2:
                _a.sent();
                return [3, 5];
            case 3:
                err_7 = _a.sent();
                (0, logger_1.loggerUtil)(err_7, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Get All Power consumption API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getAllPowerConsumption = getAllPowerConsumption;
//# sourceMappingURL=powerConsumption.js.map