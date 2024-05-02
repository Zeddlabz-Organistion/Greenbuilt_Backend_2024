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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAssets = exports.getAllUserAssets = exports.getAssetById = exports.deleteAsset = exports.updateAsset = exports.bulkUpload = exports.createAsset = void 0;
var index_1 = require("../prisma/index");
var logger_1 = require("../utils/logger");
var statusCode_1 = require("../utils/statusCode");
var uuid_1 = require("uuid");
var crud_1 = require("../helpers/crud");
var createAsset = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, asset, data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = +(req.params.userId || '0');
                asset = req.body.asset;
                data = __assign(__assign({}, asset), { assetId: (0, uuid_1.v4)(), userId: userId });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_1.create)(index_1.prisma.asset, data)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Asset created successfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Asset creation failed!'
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
                (0, logger_1.loggerUtil)("Create Asset API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.createAsset = createAsset;
var bulkUpload = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, assets, data, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = +(req.params.userId || '0');
                assets = req.body.assets;
                data = assets === null || assets === void 0 ? void 0 : assets.map(function (val) { return (__assign(__assign({}, val), { assetId: (0, uuid_1.v4)(), userId: userId })); });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_1.createMany)(index_1.prisma.asset, data)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Assets upload in bulk successfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Assets upload failed!'
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
                (0, logger_1.loggerUtil)("Bulk upload Asset API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.bulkUpload = bulkUpload;
var updateAsset = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var assetId, asset, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                assetId = req.params.assetId;
                asset = req.body.asset;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_1.updateById)(index_1.prisma.asset, asset, 'assetId', assetId)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Asset updated successfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Asset updation failed!'
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
                (0, logger_1.loggerUtil)("Asset Update API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.updateAsset = updateAsset;
var deleteAsset = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var assetId, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                assetId = req.params.assetId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_1.deleteById)(index_1.prisma.asset, 'assetId', assetId)
                        .then(function () {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Asset deleted successfully!'
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Asset deletion failed!'
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
                (0, logger_1.loggerUtil)("Asset Delete API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.deleteAsset = deleteAsset;
var getAssetById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var assetId, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                assetId = req.params.assetId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_1.getById)(index_1.prisma.asset, 'assetId', assetId)
                        .then(function (data) {
                        if (!data) {
                            return res.status(statusCode_1.statusCode.OK).json({
                                message: 'Asset not found!'
                            });
                        }
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Asset fetched successfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Failed to fetch asset!'
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
                (0, logger_1.loggerUtil)("Get Asset API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getAssetById = getAssetById;
var getAllUserAssets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, take, skip, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = +(req.params.userId || '0');
                take = +(req.query.limit || '10'), skip = +(req.query.offset || '0');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_1.getAllById)(index_1.prisma.asset, 'userId', userId, take, skip)
                        .then(function (data) {
                        if (!(data === null || data === void 0 ? void 0 : data.length)) {
                            return res.status(statusCode_1.statusCode.OK).json({
                                message: 'Assets not found!'
                            });
                        }
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'User Assets fetched successfully!',
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
                            error: 'Failed to fetch user assets!'
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
                (0, logger_1.loggerUtil)("Get All User Assets API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getAllUserAssets = getAllUserAssets;
var getAllAssets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var take, skip, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                take = +(req.query.limit || '10'), skip = +(req.query.offset || '0');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_1.getAll)(index_1.prisma.asset, take, skip)
                        .then(function (data) {
                        if (!(data === null || data === void 0 ? void 0 : data.length)) {
                            return res.status(statusCode_1.statusCode.OK).json({
                                message: 'Assets not found!'
                            });
                        }
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'All Assets fetched successfully!',
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
                            error: 'Failed to fetch all assets!'
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
                (0, logger_1.loggerUtil)("Get All Assets API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getAllAssets = getAllAssets;
//# sourceMappingURL=asset.js.map