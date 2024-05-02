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
exports.getAllPackagingTypes = exports.getPackagingType = exports.deletePackagingType = exports.updatePackagingType = exports.createPackagingType = exports.getAllUOMs = exports.getUOM = exports.deleteUOM = exports.updateUOM = exports.createUOM = exports.getAllSourceTypes = exports.getSourceType = exports.deleteSourceType = exports.updateSourceType = exports.createSourceType = exports.getAllIndustryTypes = exports.getIndustryType = exports.deleteIndustryType = exports.updateIndustryType = exports.createIndustryType = void 0;
var crud_1 = require("../helpers/crud");
var index_1 = require("../prisma/index");
var logger_1 = require("../utils/logger");
var statusCode_1 = require("../utils/statusCode");
var uuid_1 = require("uuid");
var createIndustryType = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = {
                    industryTypeId: (0, uuid_1.v4)(),
                    name: req.body.name
                };
                return [4, (0, crud_1.create)(index_1.prisma.industryType, data)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Industry type successfully created!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            message: 'Failed to create Industry Type'
                        });
                    })];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); };
exports.createIndustryType = createIndustryType;
var updateIndustryType = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, industryTypeId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                industryTypeId = req.params.industryTypeId;
                if (!industryTypeId) {
                    res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                        message: 'id should be passed as a param!'
                    });
                    return [2];
                }
                return [4, (0, crud_1.updateById)(index_1.prisma.industryType, data, 'industryTypeId', industryTypeId)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Industry type updated successfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            message: 'Failed to update Industry Type'
                        });
                    })];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); };
exports.updateIndustryType = updateIndustryType;
var deleteIndustryType = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var industryTypeId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                industryTypeId = req.params.industryTypeId;
                if (!industryTypeId) {
                    res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                        message: 'id should be passed as a param!'
                    });
                    return [2];
                }
                return [4, (0, crud_1.deleteById)(index_1.prisma.industryType, 'industryTypeId', industryTypeId)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Industry type deleted successfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            message: 'Failed to delete Industry Type'
                        });
                    })];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); };
exports.deleteIndustryType = deleteIndustryType;
var getIndustryType = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var industryTypeId, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                industryTypeId = req.params.industryTypeId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_1.getById)(index_1.prisma.industryType, 'industryTypeId', industryTypeId)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Industry Type fetched successfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Failed to fetch the Industry type!'
                        });
                    })];
            case 2:
                _a.sent();
                return [3, 5];
            case 3:
                err_1 = _a.sent();
                (0, logger_1.loggerUtil)(err_1, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Get Industry Type API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getIndustryType = getIndustryType;
var getAllIndustryTypes = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var take, skip, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                take = +(req.query.limit || '10'), skip = +(req.query.offset || '0');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_1.getAll)(index_1.prisma.industryType, take, skip)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'All Industry Types fetched successfully!',
                            data: data,
                            pagination: {
                                limit: take,
                                offset: skip
                            }
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Failed to fetch the products!'
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
                (0, logger_1.loggerUtil)("Get All Industry Types API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getAllIndustryTypes = getAllIndustryTypes;
var createSourceType = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = {
                    sourceTypeId: (0, uuid_1.v4)(),
                    name: req.body.name
                };
                return [4, (0, crud_1.create)(index_1.prisma.sourceType, data)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Source type successfully created!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            message: 'Failed to create Source Type'
                        });
                    })];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); };
exports.createSourceType = createSourceType;
var updateSourceType = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, sourceTypeId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                sourceTypeId = req.params.sourceTypeId;
                if (!sourceTypeId) {
                    res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                        message: 'id should be passed as a param!'
                    });
                    return [2];
                }
                return [4, (0, crud_1.updateById)(index_1.prisma.sourceType, data, 'sourceTypeId', sourceTypeId)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Source type updated successfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            message: 'Failed to update Source type'
                        });
                    })];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); };
exports.updateSourceType = updateSourceType;
var deleteSourceType = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sourceTypeId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sourceTypeId = req.params.sourceTypeId;
                if (!sourceTypeId) {
                    res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                        message: 'id should be passed as a param!'
                    });
                    return [2];
                }
                return [4, (0, crud_1.deleteById)(index_1.prisma.sourceType, 'sourceTypeId', sourceTypeId)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Source type deleted successfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            message: 'Failed to delete Source type'
                        });
                    })];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); };
exports.deleteSourceType = deleteSourceType;
var getSourceType = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sourceTypeId, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sourceTypeId = req.params.sourceTypeId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_1.getById)(index_1.prisma.sourceType, 'sourceTypeId', sourceTypeId)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Source Type fetched successfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Failed to fetch the source type!'
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
                (0, logger_1.loggerUtil)("Get Source Type API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getSourceType = getSourceType;
var getAllSourceTypes = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var take, skip, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                take = +(req.query.limit || '10'), skip = +(req.query.offset || '0');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_1.getAll)(index_1.prisma.sourceType, take, skip)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'All Source Types fetched successfully!',
                            data: data,
                            pagination: {
                                limit: take,
                                offset: skip
                            }
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Failed to fetch the source types!'
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
                (0, logger_1.loggerUtil)("Get All Source Types API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getAllSourceTypes = getAllSourceTypes;
var createUOM = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = {
                    uomId: (0, uuid_1.v4)(),
                    name: req.body.name
                };
                return [4, (0, crud_1.create)(index_1.prisma.uOM, data)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'UOM successfully created!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            message: 'Failed to create UOM'
                        });
                    })];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); };
exports.createUOM = createUOM;
var updateUOM = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, uomId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                uomId = req.params.uomId;
                if (!uomId) {
                    res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                        message: 'id should be passed as a param!'
                    });
                    return [2];
                }
                return [4, (0, crud_1.updateById)(index_1.prisma.uOM, data, 'uomId', uomId)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'UOM updated successfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            message: 'Failed to update UOM'
                        });
                    })];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); };
exports.updateUOM = updateUOM;
var deleteUOM = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uomId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                uomId = req.params.uomId;
                if (!uomId) {
                    res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                        message: 'id should be passed as a param!'
                    });
                    return [2];
                }
                return [4, (0, crud_1.deleteById)(index_1.prisma.uOM, 'uomId', uomId)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'UOM deleted successfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            message: 'Failed to delete UOM'
                        });
                    })];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); };
exports.deleteUOM = deleteUOM;
var getUOM = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uomId, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                uomId = req.params.uomId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_1.getById)(index_1.prisma.uOM, 'uomId', uomId)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'UOM fetched successfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Failed to fetch the UOM!'
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
                (0, logger_1.loggerUtil)("Get UOM API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getUOM = getUOM;
var getAllUOMs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var take, skip, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                take = +(req.query.limit || '10'), skip = +(req.query.offset || '0');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_1.getAll)(index_1.prisma.uOM, take, skip)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'All UOMs fetched successfully!',
                            data: data,
                            pagination: {
                                limit: take,
                                offset: skip
                            }
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Failed to fetch UOMs!'
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
                (0, logger_1.loggerUtil)("Get All UOMs API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getAllUOMs = getAllUOMs;
var createPackagingType = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = {
                    packagingTypeId: (0, uuid_1.v4)(),
                    name: req.body.name
                };
                return [4, (0, crud_1.create)(index_1.prisma.packagingType, data)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Packaging type successfully created!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            message: 'Failed to create Packaging type'
                        });
                    })];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); };
exports.createPackagingType = createPackagingType;
var updatePackagingType = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, packagingTypeId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                packagingTypeId = req.params.packagingTypeId;
                if (!packagingTypeId) {
                    res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                        message: 'packagingTypeId should be passed as a param!'
                    });
                    return [2];
                }
                return [4, (0, crud_1.updateById)(index_1.prisma.packagingType, data, 'packagingTypeId', packagingTypeId)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Packaging type updated successfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            message: 'Failed to update Packaging type'
                        });
                    })];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); };
exports.updatePackagingType = updatePackagingType;
var deletePackagingType = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var packagingTypeId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                packagingTypeId = req.params.packagingTypeId;
                if (!packagingTypeId) {
                    res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                        message: 'packagingTypeId should be passed as a param!'
                    });
                    return [2];
                }
                return [4, (0, crud_1.deleteById)(index_1.prisma.packagingType, 'packagingTypeId', packagingTypeId)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Packaging type deleted successfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            message: 'Failed to delete Packaging type'
                        });
                    })];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); };
exports.deletePackagingType = deletePackagingType;
var getPackagingType = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var packagingTypeId, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                packagingTypeId = req.params.packagingTypeId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_1.getById)(index_1.prisma.packagingType, 'packagingTypeId', packagingTypeId)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Packaging type fetched successfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Failed to fetch the Packaging type!'
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
                (0, logger_1.loggerUtil)("Get Packaging type API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getPackagingType = getPackagingType;
var getAllPackagingTypes = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var take, skip, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                take = +(req.query.limit || '10'), skip = +(req.query.offset || '0');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_1.getAll)(index_1.prisma.packagingType, take, skip)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'All Packaging types fetched successfully!',
                            data: data,
                            pagination: {
                                limit: take,
                                offset: skip
                            }
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Failed to fetch Packaging types!'
                        });
                    })];
            case 2:
                _a.sent();
                return [3, 5];
            case 3:
                err_8 = _a.sent();
                (0, logger_1.loggerUtil)(err_8, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Get All Packaging types API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getAllPackagingTypes = getAllPackagingTypes;
//# sourceMappingURL=statics.js.map