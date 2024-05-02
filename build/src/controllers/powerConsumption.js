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
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var fs_1 = __importDefault(require("fs"));
var sharp_1 = __importDefault(require("sharp"));
var index_1 = require("../prisma/index");
var logger_1 = require("../utils/logger");
var statusCode_1 = require("../utils/statusCode");
var lodash_1 = require("lodash");
var crud_2 = require("../helpers/crud");
var s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
    region: 'ap-south-1'
});
var createEnergyConsumption = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, form, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = +(req.auth._id || '0');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                form = new formidable_1.default.IncomingForm();
                return [4, form.parse(req, function (err, fields, _a) {
                        var file = _a.file;
                        index_1.prisma.montlyConsumptionPlan
                            .findMany({
                            where: {
                                userId: userId,
                                month: +(fields.month),
                                year: +(fields.year)
                            }
                        })
                            .then(function (monthlyPlans) { return __awaiter(void 0, void 0, void 0, function () {
                            var totalConsumption_1, totalGreenConsumption_1, date_1, month_1, year_1, fullDate_1;
                            return __generator(this, function (_a) {
                                if (monthlyPlans.length) {
                                    if (err) {
                                        (0, logger_1.loggerUtil)(err, 'ERROR');
                                        res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                            error: 'Problem with document'
                                        });
                                    }
                                    if (file.size > 3000000) {
                                        res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                            error: 'File size should be less than 3 MB'
                                        });
                                    }
                                    else {
                                        totalConsumption_1 = fields.totalConsumption, totalGreenConsumption_1 = fields.totalGreenConsumption, date_1 = fields.date, month_1 = fields.month, year_1 = fields.year, fullDate_1 = fields.fullDate;
                                        console.log({
                                            typeofs: {
                                                month: typeof month_1,
                                                year: typeof year_1,
                                                date: typeof date_1,
                                                fullDate: typeof fullDate_1
                                            }
                                        });
                                        (0, sharp_1.default)(fs_1.default.readFileSync(file.filepath))
                                            .resize(1000)
                                            .toBuffer()
                                            .then(function (doc) { return __awaiter(void 0, void 0, void 0, function () {
                                            var dataS3, dataPrisma, queryObj;
                                            return __generator(this, function (_a) {
                                                dataS3 = {
                                                    Bucket: 'green-built-documents',
                                                    Key: "ebBil-" + userId + "-" + date_1 + "-" + month_1 + "-" + year_1 + "-",
                                                    Body: doc,
                                                    ContentType: file.mimetype
                                                };
                                                dataPrisma = {
                                                    date: +date_1 || new Date().getDate(),
                                                    month: +month_1 || new Date().getMonth() + 1,
                                                    year: +year_1 || new Date().getFullYear(),
                                                    fullDate: fullDate_1 ? new Date(fullDate_1) : new Date(),
                                                    totalConsumption: totalConsumption_1,
                                                    totalGreenConsumption: totalGreenConsumption_1,
                                                    userId: userId,
                                                    ebBillLocation: ''
                                                };
                                                queryObj = {
                                                    month: +month_1,
                                                    year: +year_1,
                                                    userId: userId
                                                };
                                                (0, logger_1.loggerUtil)('Hello world');
                                                s3.upload(dataS3, function (err, response) {
                                                    if (err) {
                                                        (0, logger_1.loggerUtil)('ERROR');
                                                        (0, logger_1.loggerUtil)(err);
                                                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                                            error: 'Error while uploading document'
                                                        });
                                                    }
                                                    else {
                                                        (0, logger_1.loggerUtil)('File Uploaded Successfully');
                                                        dataPrisma.ebBillLocation = response.Location;
                                                        (0, crud_1.getAllByQuery)(index_1.prisma.powerConsumption, queryObj).then(function (val) { return __awaiter(void 0, void 0, void 0, function () {
                                                            return __generator(this, function (_a) {
                                                                switch (_a.label) {
                                                                    case 0:
                                                                        if (!!val.length) return [3, 2];
                                                                        return [4, (0, crud_2.create)(index_1.prisma.powerConsumption, dataPrisma)
                                                                                .then(function (data) {
                                                                                return res.status(statusCode_1.statusCode.OK).json({
                                                                                    message: 'Power consumption data created sucessfully!',
                                                                                    data: data
                                                                                });
                                                                            })
                                                                                .catch(function (err) {
                                                                                (0, logger_1.loggerUtil)(err, 'ERROR');
                                                                                return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                                                                    error: 'Error while creating Power consumption data'
                                                                                });
                                                                            })];
                                                                    case 1:
                                                                        _a.sent();
                                                                        return [3, 3];
                                                                    case 2:
                                                                        res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                                                            error: 'Power consumption data for this month is already present for the user!'
                                                                        });
                                                                        _a.label = 3;
                                                                    case 3: return [2];
                                                                }
                                                            });
                                                        }); });
                                                    }
                                                    return;
                                                });
                                                return [2];
                                            });
                                        }); });
                                    }
                                }
                                else {
                                    res
                                        .status(statusCode_1.statusCode.BAD_REQUEST)
                                        .json({ error: 'No Monthly Plan Found for this month.' });
                                }
                                return [2];
                            });
                        }); });
                    })];
            case 2:
                _a.sent();
                return [3, 5];
            case 3:
                err_1 = _a.sent();
                (0, logger_1.loggerUtil)(err_1, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Create Power Consumption API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.createEnergyConsumption = createEnergyConsumption;
var updateEnergyConsumption = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var powerConsumptionId, form, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                powerConsumptionId = +(req.params.powerConsumptionId || '0');
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
                                                                    .then(function (data) {
                                                                    return res.status(statusCode_1.statusCode.OK).json({
                                                                        message: 'Power consumption data updated sucessfully!',
                                                                        data: data
                                                                    });
                                                                })
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
                                                .then(function (data) {
                                                return res.status(statusCode_1.statusCode.OK).json({
                                                    message: 'Power consumption data updated sucessfully!',
                                                    data: data
                                                });
                                            })
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
    var id, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = +(req.params.powerConsumptionId || '0');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
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
                                                            .then(function () {
                                                            res.status(statusCode_1.statusCode.OK).json({
                                                                message: 'Power consumption  has been approved sucessfully!'
                                                            });
                                                        })
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
            case 2:
                _a.sent();
                return [3, 5];
            case 3:
                err_3 = _a.sent();
                (0, logger_1.loggerUtil)(err_3, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Approve Power Consumption with Source API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.approvePowerConsumption = approvePowerConsumption;
var deletePowerConsumption = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var powerConsumptionId, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                powerConsumptionId = +(req.params.powerConsumptionId || '0');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_2.deleteById)(index_1.prisma.powerConsumption, 'id', powerConsumptionId)
                        .then(function () {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Power consumption data deleted sucessfully!'
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Error while deleting Power consumption data'
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
                (0, logger_1.loggerUtil)("Delete Power consumption API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.deletePowerConsumption = deletePowerConsumption;
var getPowerConsumptionById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var powerConsumptionId, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                powerConsumptionId = +(req.params.powerConsumptionId || '0');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_2.getById)(index_1.prisma.powerConsumption, 'id', powerConsumptionId)
                        .then(function (data) {
                        if ((0, lodash_1.isEmpty)(data)) {
                            return res.status(statusCode_1.statusCode.NOT_FOUND).json({
                                message: 'Power consumption data was not found!'
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
                err_5 = _a.sent();
                (0, logger_1.loggerUtil)(err_5, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Get Power consumption API Called!");
                return [7];
            case 5: return [2];
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