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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMonthlyConsumption = exports.getAllMonthlyConsumptionByUserId = exports.getAllByMonthlyConsumptionId = exports.getMonthlyConsumptionById = exports.deleteMonthlyConsumptionById = exports.deleteByMonthlyConsumptionPlanId = exports.approveMonthlyConsumptionPlan = exports.updateMonthlyConsumptionPlan = exports.createMonthlyConsumptionPlan = void 0;
var crud_1 = require("./../helpers/crud");
var index_1 = require("../prisma/index");
var logger_1 = require("../utils/logger");
var statusCode_1 = require("../utils/statusCode");
var uuid_1 = require("uuid");
var crud_2 = require("../helpers/crud");
var lodash_1 = require("lodash");
var createMonthlyConsumptionPlan = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, info, monthlyPlanData, data, finalData_1, queryObj, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = +(req.auth._id || '0');
                info = req.body.info;
                monthlyPlanData = req.body.data;
                data = {
                    monthlyPlanId: (0, uuid_1.v4)(),
                    userId: userId
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                finalData_1 = [];
                monthlyPlanData === null || monthlyPlanData === void 0 ? void 0 : monthlyPlanData.forEach(function (val) {
                    var obj = {
                        monthlyPlanId: data.monthlyPlanId,
                        userId: userId,
                        date: +(info === null || info === void 0 ? void 0 : info.date) || new Date().getDate(),
                        month: +(info === null || info === void 0 ? void 0 : info.month) || new Date().getMonth() + 1,
                        year: +(info === null || info === void 0 ? void 0 : info.year) || new Date().getFullYear(),
                        fullDate: (info === null || info === void 0 ? void 0 : info.fullDate) ? val === null || val === void 0 ? void 0 : val.fullDate : new Date(),
                        sourceType: val === null || val === void 0 ? void 0 : val.sourceType,
                        ownCaptive: (val === null || val === void 0 ? void 0 : val.ownCaptive) || 0,
                        groupCaptive: (val === null || val === void 0 ? void 0 : val.groupCaptive) || 0,
                        thirdPartyPurchase: (val === null || val === void 0 ? void 0 : val.thirdPartyPurchase) || 0,
                        total: (val.ownCaptive || 0) +
                            (val.groupCaptive || 0) +
                            (val.thirdPartyPurchase || 0)
                    };
                    finalData_1.push(obj);
                });
                queryObj = {
                    month: +(info === null || info === void 0 ? void 0 : info.month),
                    year: +(info === null || info === void 0 ? void 0 : info.year),
                    userId: userId
                };
                return [4, (0, crud_1.getAllByQuery)(index_1.prisma.montlyConsumptionPlan, queryObj).then(function (val) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!val.length) return [3, 2];
                                    return [4, (0, crud_1.createMany)(index_1.prisma.montlyConsumptionPlan, finalData_1)
                                            .then(function (count) {
                                            res.status(statusCode_1.statusCode.OK).json({
                                                message: 'Monthly consumption plan created sucessfully!',
                                                count: count,
                                                data: finalData_1
                                            });
                                        })
                                            .catch(function (err) {
                                            (0, logger_1.loggerUtil)(err, 'ERROR');
                                            res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                                error: 'Error while creating monthly consumption plan'
                                            });
                                        })];
                                case 1:
                                    _a.sent();
                                    return [3, 3];
                                case 2:
                                    res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                        error: 'Monthly plan data for this month is already present for the user!'
                                    });
                                    _a.label = 3;
                                case 3: return [2];
                            }
                        });
                    }); })];
            case 2:
                _a.sent();
                return [3, 5];
            case 3:
                err_1 = _a.sent();
                (0, logger_1.loggerUtil)(err_1, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Create Monthly Consumption Plan API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.createMonthlyConsumptionPlan = createMonthlyConsumptionPlan;
var updateMonthlyConsumptionPlan = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var info, monthlyPlanData;
    return __generator(this, function (_a) {
        info = req.body.info;
        monthlyPlanData = req.body.data;
        try {
            monthlyPlanData === null || monthlyPlanData === void 0 ? void 0 : monthlyPlanData.forEach(function (val) {
                var id = val === null || val === void 0 ? void 0 : val.id;
                console.log(val === null || val === void 0 ? void 0 : val.id, 'Id ');
                index_1.prisma.montlyConsumptionPlan
                    .update({
                    where: {
                        id: id
                    },
                    data: {
                        date: +(info === null || info === void 0 ? void 0 : info.date) || new Date().getDate(),
                        month: +(info === null || info === void 0 ? void 0 : info.month) || new Date().getMonth() + 1,
                        year: +(info === null || info === void 0 ? void 0 : info.year) || new Date().getFullYear(),
                        fullDate: (info === null || info === void 0 ? void 0 : info.fullDate) ? val === null || val === void 0 ? void 0 : val.fullDate : new Date(),
                        sourceType: val === null || val === void 0 ? void 0 : val.sourceType,
                        ownCaptive: (val === null || val === void 0 ? void 0 : val.ownCaptive) || 0,
                        groupCaptive: (val === null || val === void 0 ? void 0 : val.groupCaptive) || 0,
                        thirdPartyPurchase: (val === null || val === void 0 ? void 0 : val.thirdPartyPurchase) || 0,
                        total: (val.ownCaptive || 0) +
                            (val.groupCaptive || 0) +
                            (val.thirdPartyPurchase || 0)
                    }
                })
                    .then(function (data) {
                    console.log(data);
                })
                    .catch(function (err) {
                    (0, logger_1.loggerUtil)(err, 'ERROR');
                    res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                        error: 'Error while updating monthly plan with source type For Each'
                    });
                });
            });
            res.status(statusCode_1.statusCode.OK).json({
                message: 'Monthly Consumption Plan updated successfully.'
            });
        }
        catch (err) {
            (0, logger_1.loggerUtil)(err, 'ERROR');
        }
        finally {
            (0, logger_1.loggerUtil)("Update Monthly Consumption Plan API Called!");
        }
        return [2];
    });
}); };
exports.updateMonthlyConsumptionPlan = updateMonthlyConsumptionPlan;
var approveMonthlyConsumptionPlan = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monthlyPlanId, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monthlyPlanId = req.params.monthlyPlanId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, index_1.prisma.montlyConsumptionPlan
                        .findMany({
                        where: {
                            monthlyPlanId: monthlyPlanId
                        }
                    })
                        .then(function (monthlyPlan) { return __awaiter(void 0, void 0, void 0, function () {
                        var total;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    total = 0;
                                    monthlyPlan === null || monthlyPlan === void 0 ? void 0 : monthlyPlan.forEach(function (data) { return (total += data.total || 0); });
                                    return [4, index_1.prisma.user
                                            .findFirst({
                                            where: {
                                                id: (_a = monthlyPlan[0]) === null || _a === void 0 ? void 0 : _a.userId
                                            }
                                        })
                                            .then(function (user) { return __awaiter(void 0, void 0, void 0, function () {
                                            var _a;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0: return [4, index_1.prisma.user.update({
                                                            where: {
                                                                id: (_a = monthlyPlan[0]) === null || _a === void 0 ? void 0 : _a.userId
                                                            },
                                                            data: {
                                                                points: ((user === null || user === void 0 ? void 0 : user.points) || 0) + total,
                                                                totalPoints: ((user === null || user === void 0 ? void 0 : user.totalPoints) || 0) + total
                                                            }
                                                        })];
                                                    case 1:
                                                        _b.sent();
                                                        return [2];
                                                }
                                            });
                                        }); })
                                            .then(function () { return __awaiter(void 0, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4, index_1.prisma.montlyConsumptionPlan
                                                            .updateMany({
                                                            where: {
                                                                monthlyPlanId: monthlyPlanId
                                                            },
                                                            data: {
                                                                isApproved: true
                                                            }
                                                        })
                                                            .then(function (data) {
                                                            res.status(statusCode_1.statusCode.OK).json({
                                                                message: 'Monthly consumption plan has been approved sucessfully!',
                                                                data: data
                                                            });
                                                        })
                                                            .catch(function (err) {
                                                            (0, logger_1.loggerUtil)(err, 'ERROR');
                                                            res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                                                error: 'Error while approving monthly consumption plan with source type'
                                                            });
                                                        })];
                                                    case 1:
                                                        _a.sent();
                                                        return [2];
                                                }
                                            });
                                        }); })];
                                case 1:
                                    _b.sent();
                                    return [2];
                            }
                        });
                    }); })];
            case 2:
                _a.sent();
                return [3, 5];
            case 3:
                err_2 = _a.sent();
                (0, logger_1.loggerUtil)(err_2, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Approve Monthly Consumption Plan with Source API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.approveMonthlyConsumptionPlan = approveMonthlyConsumptionPlan;
var deleteByMonthlyConsumptionPlanId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monthlyPlanId, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monthlyPlanId = req.params.monthlyPlanId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, index_1.prisma.montlyConsumptionPlan
                        .deleteMany({
                        where: {
                            monthlyPlanId: monthlyPlanId
                        }
                    })
                        .then(function (data) {
                        res.status(statusCode_1.statusCode.OK).json({
                            message: 'Monthly consumption plan deleted sucessfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Error while deleting monthly consumption plan'
                        });
                    })];
            case 2:
                _a.sent();
                return [3, 5];
            case 3:
                err_3 = _a.sent();
                (0, logger_1.loggerUtil)(err_3, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Delete By Monthly Consumption Plan Id API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.deleteByMonthlyConsumptionPlanId = deleteByMonthlyConsumptionPlanId;
var deleteMonthlyConsumptionById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = +(req.params.monthlyPlanId || '0');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_2.deleteById)(index_1.prisma.montlyConsumptionPlan, 'id', id)
                        .then(function (data) {
                        res.status(statusCode_1.statusCode.OK).json({
                            message: 'Monthly consumption plan deleted sucessfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Error while deleting monthly consumption plan'
                        });
                    })];
            case 2:
                _a.sent();
                return [3, 5];
            case 3:
                err_4 = _a.sent();
                (0, logger_1.loggerUtil)(err_4, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Delete By Id Monthly Consumption Plan API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.deleteMonthlyConsumptionById = deleteMonthlyConsumptionById;
var getMonthlyConsumptionById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = +(req.params.monthlyPlanId || '0');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_2.getById)(index_1.prisma.montlyConsumptionPlan, 'id', id)
                        .then(function (data) {
                        if ((0, lodash_1.isEmpty)(data)) {
                            res.status(statusCode_1.statusCode.NOT_FOUND).json({
                                message: 'No plans found!'
                            });
                        }
                        else {
                            res.status(statusCode_1.statusCode.OK).json({
                                message: 'Monthly product plan fetched sucessfully!',
                                data: data
                            });
                        }
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Error while fecthing monthly product plan'
                        });
                    })];
            case 2:
                _a.sent();
                return [3, 5];
            case 3:
                err_5 = _a.sent();
                (0, logger_1.loggerUtil)(err_5, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Get By Monthly Plan Consumption Id API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getMonthlyConsumptionById = getMonthlyConsumptionById;
var getAllByMonthlyConsumptionId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var monthlyPlanId, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monthlyPlanId = req.params.monthlyPlanId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_2.getAllById)(index_1.prisma.montlyConsumptionPlan, 'monthlyPlanId', monthlyPlanId)
                        .then(function (data) {
                        var finalObj = { monthlyPlans: [] };
                        if ((0, lodash_1.isEmpty)(data)) {
                            res.status(statusCode_1.statusCode.NOT_FOUND).json({
                                message: 'No plans found!'
                            });
                        }
                        else {
                            var total_1 = 0;
                            data.forEach(function (val, inx) {
                                total_1 += val === null || val === void 0 ? void 0 : val.total;
                                if (inx === 0) {
                                    finalObj.monthlyPlanId = val.monthlyPlanId;
                                    finalObj.month = val.month;
                                    finalObj.date = val.date;
                                    finalObj.year = val.year;
                                    finalObj.fullDate = val.fullDate;
                                    finalObj.userId = val.userId;
                                    finalObj.monthlyPlans = __spreadArray([
                                        {
                                            id: val.id,
                                            ownCaptive: val.ownCaptive,
                                            groupCaptive: val.groupCaptive,
                                            thirdPartyPurchase: val.thirdPartyPurchase,
                                            total: val.total,
                                            isApproved: val.isApproved,
                                            isTrash: val.isTrash,
                                            sourceType: val.sourceType
                                        }
                                    ], finalObj.monthlyPlans, true);
                                }
                                else {
                                    finalObj.monthlyPlans = __spreadArray([
                                        {
                                            id: val.id,
                                            ownCaptive: val.ownCaptive,
                                            groupCaptive: val.groupCaptive,
                                            thirdPartyPurchase: val.thirdPartyPurchase,
                                            total: val.total,
                                            isApproved: val.isApproved,
                                            isTrash: val.isTrash,
                                            sourceType: val.sourceType
                                        }
                                    ], finalObj.monthlyPlans, true);
                                }
                            });
                            res.status(statusCode_1.statusCode.OK).json({
                                message: 'Monthly consumption plans fetched sucessfully!',
                                data: __assign(__assign({}, finalObj), { total: total_1 })
                            });
                        }
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Error while fecthing monthly consumption plans'
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
                (0, logger_1.loggerUtil)("Get By Monthly Cosumption API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getAllByMonthlyConsumptionId = getAllByMonthlyConsumptionId;
var getAllMonthlyConsumptionByUserId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = +(req.params.userId || '0');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_2.getAllById)(index_1.prisma.montlyConsumptionPlan, 'userId', userId, 100, 0)
                        .then(function (data) {
                        var reducedData = data === null || data === void 0 ? void 0 : data.reduce(function (r, acc) {
                            r[acc.monthlyPlanId] = r[acc.monthlyPlanId] || [];
                            r[acc.monthlyPlanId].push(acc);
                            return r;
                        }, Object.create(null));
                        if ((0, lodash_1.isEmpty)(data)) {
                            res.status(statusCode_1.statusCode.NOT_FOUND).json({
                                message: 'No plans found!'
                            });
                        }
                        else {
                            var finalData_2 = [];
                            var obj_1 = {};
                            var total_2 = 0;
                            (0, lodash_1.forIn)(reducedData, function (val) {
                                var tempObj = {};
                                var monthlyPlans = [];
                                val === null || val === void 0 ? void 0 : val.forEach(function (data, inx) {
                                    if (inx === 0) {
                                        tempObj.monthlyPlanId = data === null || data === void 0 ? void 0 : data.monthlyPlanId;
                                        tempObj.userId = data === null || data === void 0 ? void 0 : data.userId;
                                        tempObj.month = data === null || data === void 0 ? void 0 : data.month;
                                        tempObj.year = data === null || data === void 0 ? void 0 : data.year;
                                        tempObj.date = data === null || data === void 0 ? void 0 : data.date;
                                        tempObj.fullDate = data === null || data === void 0 ? void 0 : data.fullDate;
                                    }
                                    monthlyPlans.push({
                                        id: data === null || data === void 0 ? void 0 : data.id,
                                        ownCaptive: data === null || data === void 0 ? void 0 : data.ownCaptive,
                                        groupCaptive: data === null || data === void 0 ? void 0 : data.groupCaptive,
                                        thirdPartyPurchase: data === null || data === void 0 ? void 0 : data.thirdPartyPurchase,
                                        total: data === null || data === void 0 ? void 0 : data.total,
                                        isApproved: data === null || data === void 0 ? void 0 : data.isApproved,
                                        isTrash: data === null || data === void 0 ? void 0 : data.isTrash,
                                        sourceType: data === null || data === void 0 ? void 0 : data.sourceType
                                    });
                                    total_2 += data === null || data === void 0 ? void 0 : data.total;
                                });
                                tempObj.toal = total_2;
                                tempObj.monthlyPlans = monthlyPlans;
                                obj_1 = __assign(__assign({}, obj_1), tempObj);
                                finalData_2.push(obj_1);
                                monthlyPlans = [];
                                total_2 = 0;
                            });
                            res.status(statusCode_1.statusCode.OK).json({
                                message: 'Monthly consumption plans fetched sucessfully!',
                                data: finalData_2
                            });
                        }
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Error while fecthing user monthly consumption plan'
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
                (0, logger_1.loggerUtil)("Get Monthly Consumption By User API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getAllMonthlyConsumptionByUserId = getAllMonthlyConsumptionByUserId;
var getAllMonthlyConsumption = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log(req);
        try {
            index_1.prisma.montlyConsumptionPlan
                .findMany({ include: { user: true }, take: 500, skip: 0 })
                .then(function (data) {
                console.log(data);
                var reducedData = data === null || data === void 0 ? void 0 : data.reduce(function (r, acc) {
                    r[acc.monthlyPlanId] = r[acc.monthlyPlanId] || [];
                    r[acc.monthlyPlanId].push(acc);
                    return r;
                }, Object.create(null));
                if ((0, lodash_1.isEmpty)(data)) {
                    res.status(statusCode_1.statusCode.NOT_FOUND).json({
                        message: 'No plans found!'
                    });
                }
                else {
                    var finalData_3 = [];
                    var obj_2 = {};
                    var total_3 = 0;
                    (0, lodash_1.forIn)(reducedData, function (val) {
                        var tempObj = {};
                        var monthlyPlans = [];
                        val === null || val === void 0 ? void 0 : val.forEach(function (data, inx) {
                            console.log(data);
                            if (inx === 0) {
                                tempObj.monthlyPlanId = data === null || data === void 0 ? void 0 : data.monthlyPlanId;
                                tempObj.userId = data === null || data === void 0 ? void 0 : data.userId;
                                tempObj.month = data === null || data === void 0 ? void 0 : data.month;
                                tempObj.year = data === null || data === void 0 ? void 0 : data.year;
                                tempObj.date = data === null || data === void 0 ? void 0 : data.date;
                                tempObj.fullDate = data === null || data === void 0 ? void 0 : data.fullDate;
                                tempObj.user = data === null || data === void 0 ? void 0 : data.user;
                            }
                            monthlyPlans.push({
                                id: data === null || data === void 0 ? void 0 : data.id,
                                ownCaptive: data === null || data === void 0 ? void 0 : data.ownCaptive,
                                groupCaptive: data === null || data === void 0 ? void 0 : data.groupCaptive,
                                thirdPartyPurchase: data === null || data === void 0 ? void 0 : data.thirdPartyPurchase,
                                total: data === null || data === void 0 ? void 0 : data.total,
                                isApproved: data === null || data === void 0 ? void 0 : data.isApproved,
                                isTrash: data === null || data === void 0 ? void 0 : data.isTrash,
                                sourceType: data === null || data === void 0 ? void 0 : data.sourceType
                            });
                            total_3 += data === null || data === void 0 ? void 0 : data.total;
                        });
                        tempObj.toal = total_3;
                        tempObj.monthlyPlans = monthlyPlans;
                        obj_2 = __assign(__assign({}, obj_2), tempObj);
                        finalData_3.push(obj_2);
                        monthlyPlans = [];
                        total_3 = 0;
                    });
                    res.status(statusCode_1.statusCode.OK).json({
                        message: 'Monthly consumption plans fetched sucessfully!',
                        data: finalData_3
                    });
                }
            })
                .catch(function (err) {
                (0, logger_1.loggerUtil)(err, 'ERROR');
                res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                    error: 'Error while fecthing monthly consumption plans'
                });
            });
        }
        catch (err) {
            (0, logger_1.loggerUtil)(err, 'ERROR');
        }
        finally {
            (0, logger_1.loggerUtil)("Get All Monthly Consumptions API Called!");
        }
        return [2];
    });
}); };
exports.getAllMonthlyConsumption = getAllMonthlyConsumption;
//# sourceMappingURL=monthlyPlan.js.map