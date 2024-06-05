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
exports.getProductsBySearchTerm = exports.getAllProductsByQuery = exports.updateProductPoints = exports.approveProduct = exports.getAllProducts = exports.getAllCorporateProducts = exports.getProduct = exports.deleteProduct = exports.bulkUpload = exports.createProduct = void 0;
var generateId_1 = require("./../utils/generateId");
var index_1 = require("../prisma/index");
var logger_1 = require("../utils/logger");
var statusCode_1 = require("../utils/statusCode");
var uuid_1 = require("uuid");
var crud_1 = require("../helpers/crud");
var logUser_1 = require("../helpers/logUser");
var createProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, product, data, userData_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.auth._id;
                product = req.body.product;
                data = __assign(__assign({}, product), { productId: (0, uuid_1.v4)(), userId: userId });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, 6, 7]);
                return [4, (0, crud_1.getById)(index_1.prisma.user, 'id', userId)];
            case 2:
                userData_1 = _a.sent();
                return [4, index_1.prisma.product
                        .findMany({
                        where: { userId: userId }
                    })
                        .then(function (data) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            data.forEach(function (prod) {
                                if (prod.title.trim().toLowerCase() ==
                                    product.title.trim().toLowerCase()) {
                                    return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                        message: 'Product with the same name already exists.'
                                    });
                                }
                                return;
                            });
                            return [2];
                        });
                    }); })];
            case 3:
                _a.sent();
                return [4, index_1.prisma.product
                        .count({
                        where: {
                            userId: userId
                        }
                    })
                        .then(function (count) { return __awaiter(void 0, void 0, void 0, function () {
                        var prefix, finalData;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    prefix = (_b = (_a = product.industryType) === null || _a === void 0 ? void 0 : _a.substring(0, 3)) === null || _b === void 0 ? void 0 : _b.toUpperCase();
                                    finalData = __assign(__assign({}, data), { productCode: prefix + (0, generateId_1.generateDocumentId)(count, 4) });
                                    return [4, (0, crud_1.create)(index_1.prisma.product, finalData).then(function (data) { return __awaiter(void 0, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4, index_1.prisma.notification
                                                            .create({
                                                            data: {
                                                                notificationId: (0, uuid_1.v4)(),
                                                                date: new Date().getDate(),
                                                                month: new Date().getMonth() + 1,
                                                                year: new Date().getFullYear(),
                                                                fullDate: new Date(),
                                                                text: "Product - " + product.title + " has been created!",
                                                                userId: userId
                                                            }
                                                        })
                                                            .then(function () {
                                                            (0, logUser_1.loguser)(userData_1 === null || userData_1 === void 0 ? void 0 : userData_1.id, userData_1 === null || userData_1 === void 0 ? void 0 : userData_1.name, userData_1 === null || userData_1 === void 0 ? void 0 : userData_1.role, product.title + " has been created!", res);
                                                            return res.status(statusCode_1.statusCode.OK).json({
                                                                message: 'Product created successfully!',
                                                                data: data
                                                            });
                                                        })
                                                            .catch(function (err) {
                                                            (0, logger_1.loggerUtil)(err, 'ERROR');
                                                            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                                                error: 'Product creation failed!'
                                                            });
                                                        })];
                                                    case 1:
                                                        _a.sent();
                                                        return [2];
                                                }
                                            });
                                        }); })];
                                case 1:
                                    _c.sent();
                                    return [2];
                            }
                        });
                    }); })
                        .catch(function () {
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Product creation failed!'
                        });
                    })];
            case 4:
                _a.sent();
                return [3, 7];
            case 5:
                err_1 = _a.sent();
                (0, logger_1.loggerUtil)(err_1, 'ERROR');
                return [3, 7];
            case 6:
                (0, logger_1.loggerUtil)("Create Product API Called!");
                return [7];
            case 7: return [2];
        }
    });
}); };
exports.createProduct = createProduct;
var bulkUpload = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, products, data, titlesWithQuotes, userData_2, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.auth._id;
                products = req.body.products;
                data = products === null || products === void 0 ? void 0 : products.map(function (val) { return (__assign(__assign({}, val), { productId: (0, uuid_1.v4)(), userId: userId })); });
                titlesWithQuotes = data.map(function (item) { return "'" + item.title + "'"; }).join(', ');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, 5, 6]);
                return [4, (0, crud_1.getById)(index_1.prisma.user, 'id', userId)];
            case 2:
                userData_2 = _a.sent();
                return [4, (0, crud_1.createMany)(index_1.prisma.product, data)
                        .then(function (data) {
                        (0, logUser_1.loguser)(userData_2 === null || userData_2 === void 0 ? void 0 : userData_2.id, userData_2 === null || userData_2 === void 0 ? void 0 : userData_2.name, userData_2 === null || userData_2 === void 0 ? void 0 : userData_2.role, titlesWithQuotes + " Products updated in bulk successfully!", res);
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Products updated in bulk successfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Products upload failed!'
                        });
                    })];
            case 3:
                _a.sent();
                return [3, 6];
            case 4:
                err_2 = _a.sent();
                (0, logger_1.loggerUtil)(err_2, 'ERROR');
                return [3, 6];
            case 5:
                (0, logger_1.loggerUtil)("Bulk upload Product API Called!");
                return [7];
            case 6: return [2];
        }
    });
}); };
exports.bulkUpload = bulkUpload;
var deleteProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, productId, userData_3, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.auth._id;
                productId = req.params.productId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, 5, 6]);
                return [4, (0, crud_1.getById)(index_1.prisma.user, 'id', userId)];
            case 2:
                userData_3 = _a.sent();
                return [4, (0, crud_1.getById)(index_1.prisma.product, 'productId', productId)
                        .then(function (product) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!product.isApproved) return [3, 2];
                                    return [4, (0, crud_1.deleteById)(index_1.prisma.product, 'productId', productId)
                                            .then(function (data) {
                                            (0, logUser_1.loguser)(userData_3 === null || userData_3 === void 0 ? void 0 : userData_3.id, userData_3 === null || userData_3 === void 0 ? void 0 : userData_3.name, userData_3 === null || userData_3 === void 0 ? void 0 : userData_3.role, data.title + " Product deleted successfully!", res);
                                            return res.status(statusCode_1.statusCode.OK).json({
                                                message: 'Product deleted successfully!',
                                                data: data
                                            });
                                        })
                                            .catch(function (err) {
                                            (0, logger_1.loggerUtil)(err, 'ERROR');
                                            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                                error: 'Product deletion failed!'
                                            });
                                        })];
                                case 1:
                                    _a.sent();
                                    return [3, 3];
                                case 2: return [2, res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                        error: 'Product has been Approved.'
                                    })];
                                case 3: return [2, res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                        error: 'Product has been Approved.'
                                    })];
                            }
                        });
                    }); })
                        .catch(function () {
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Product deletion failed!'
                        });
                    })
                        .finally(function () {
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({ error: 'Error' });
                    })];
            case 3:
                _a.sent();
                return [3, 6];
            case 4:
                err_3 = _a.sent();
                (0, logger_1.loggerUtil)(err_3, 'ERROR');
                return [3, 6];
            case 5:
                (0, logger_1.loggerUtil)("Delete Product API Called!");
                return [7];
            case 6: return [2];
        }
    });
}); };
exports.deleteProduct = deleteProduct;
var getProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productId = req.params.productId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_1.getById)(index_1.prisma.product, 'productId', productId)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Corporate Product fetched successfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Failed to fetch the corporate product!'
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
                (0, logger_1.loggerUtil)("Get Corporate Product API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getProduct = getProduct;
var getAllCorporateProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, take, skip, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.auth._id;
                take = +(req.query.limit || '10'), skip = +(req.query.offset || '0');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_1.getAllById)(index_1.prisma.product, 'userId', userId, take, skip)
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Corporate Products fetched successfully!',
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
                            error: 'Failed to fetch the corporate products!'
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
                (0, logger_1.loggerUtil)("Get All Corporate Products API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getAllCorporateProducts = getAllCorporateProducts;
var getAllProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var take, skip, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                take = +(req.query.limit || '10'), skip = +(req.query.offset || '0');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, index_1.prisma.product
                        .findMany({ include: { user: true }, take: take, skip: skip })
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'All Products fetched successfully!',
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
                err_6 = _a.sent();
                (0, logger_1.loggerUtil)(err_6, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Get All Products API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getAllProducts = getAllProducts;
var approveProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, data, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productId = req.params.productId;
                data = {
                    isApproved: true
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_1.updateById)(index_1.prisma.product, data, 'productId', productId).then(function (data) { return __awaiter(void 0, void 0, void 0, function () {
                        var userData;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, (0, crud_1.getById)(index_1.prisma.user, 'id', data.userId)];
                                case 1:
                                    userData = _a.sent();
                                    (0, logUser_1.loguser)(userData === null || userData === void 0 ? void 0 : userData.id, userData === null || userData === void 0 ? void 0 : userData.name, userData === null || userData === void 0 ? void 0 : userData.role, "Product - " + data.title + " has been approved by admin", res);
                                    return [4, index_1.prisma.notification
                                            .create({
                                            data: {
                                                notificationId: (0, uuid_1.v4)(),
                                                date: new Date().getDate(),
                                                month: new Date().getMonth() + 1,
                                                year: new Date().getFullYear(),
                                                fullDate: new Date(),
                                                text: "Product - " + data.title + " has been approved!",
                                                userId: data === null || data === void 0 ? void 0 : data.userId
                                            }
                                        })
                                            .then(function () {
                                            return res.status(statusCode_1.statusCode.OK).json({
                                                message: 'Product approved successfully!',
                                                data: data
                                            });
                                        })
                                            .catch(function (err) {
                                            (0, logger_1.loggerUtil)(err, 'ERROR');
                                            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                                error: 'Product approval failed!'
                                            });
                                        })];
                                case 2:
                                    _a.sent();
                                    return [2];
                            }
                        });
                    }); })];
            case 2:
                _a.sent();
                return [3, 5];
            case 3:
                err_7 = _a.sent();
                (0, logger_1.loggerUtil)(err_7, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Approve Product API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.approveProduct = approveProduct;
var updateProductPoints = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, points, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = +(req.params.productId || 0);
                points = typeof req.body.points === 'string'
                    ? +(req.body.points || 0)
                    : req.body.points || 0;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_1.getById)(index_1.prisma.product, 'id', id)
                        .then(function (product) { return __awaiter(void 0, void 0, void 0, function () {
                        var data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    data = {
                                        points: points
                                    };
                                    return [4, (0, crud_1.updateById)(index_1.prisma.product, data, 'productId', product === null || product === void 0 ? void 0 : product.productId)
                                            .then(function (data) { return __awaiter(void 0, void 0, void 0, function () {
                                            var userData;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4, (0, crud_1.getById)(index_1.prisma.user, 'id', data.userId)];
                                                    case 1:
                                                        userData = _a.sent();
                                                        (0, logUser_1.loguser)(userData === null || userData === void 0 ? void 0 : userData.id, userData === null || userData === void 0 ? void 0 : userData.name, userData === null || userData === void 0 ? void 0 : userData.role, "Product points updated successfully by admin", res);
                                                        return [2, res.status(statusCode_1.statusCode.OK).json({
                                                                message: 'Product updated successfully!',
                                                                data: data
                                                            })];
                                                }
                                            });
                                        }); })
                                            .catch(function (err) {
                                            (0, logger_1.loggerUtil)(err, 'ERROR');
                                            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                                error: 'Product approval failed!'
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
                            error: 'NO product found!'
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
                (0, logger_1.loggerUtil)("Approve Product API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.updateProductPoints = updateProductPoints;
var getAllProductsByQuery = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var take, skip, queryFromArray, query, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                take = +(req.query.limit || '10'), skip = +(req.query.offset || '0');
                queryFromArray = +(req.query.queryFromArray || '0');
                query = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, 7, 8]);
                if (!!queryFromArray) return [3, 3];
                return [4, index_1.prisma.product
                        .findMany({
                        where: __assign({}, query),
                        take: take,
                        skip: skip
                    })
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'All Products fetched successfully!',
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
            case 3: return [4, index_1.prisma.product
                    .findMany({
                    where: {
                        uom: {
                            in: req.body.uom || []
                        },
                        packagingType: {
                            hasSome: req.body.packagingType || []
                        },
                        industryType: {
                            in: req.body.industryType || []
                        }
                    }
                })
                    .then(function (data) {
                    return res.status(statusCode_1.statusCode.OK).json({
                        message: 'All Products fetched successfully!',
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
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [3, 8];
            case 6:
                err_9 = _a.sent();
                (0, logger_1.loggerUtil)(err_9, 'ERROR');
                return [3, 8];
            case 7:
                (0, logger_1.loggerUtil)("Get All Products API Called!");
                return [7];
            case 8: return [2];
        }
    });
}); };
exports.getAllProductsByQuery = getAllProductsByQuery;
var getProductsBySearchTerm = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var take, skip, userId, _a, _b, key, _c, value, err_10;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                take = +(req.query.limit || '10'), skip = +(req.query.offset || '0');
                userId = +(req.auth._id || '');
                _a = req.body, _b = _a.key, key = _b === void 0 ? '' : _b, _c = _a.value, value = _c === void 0 ? '' : _c;
                _e.label = 1;
            case 1:
                _e.trys.push([1, 3, 4, 5]);
                return [4, index_1.prisma.product
                        .findMany({
                        where: (_d = {},
                            _d[key] = {
                                contains: value,
                                mode: 'insensitive'
                            },
                            _d.userId = userId,
                            _d),
                        take: take,
                        skip: skip
                    })
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'All Products fetched successfully!',
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
                _e.sent();
                return [3, 5];
            case 3:
                err_10 = _e.sent();
                (0, logger_1.loggerUtil)(err_10, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Get All Products API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getProductsBySearchTerm = getProductsBySearchTerm;
//# sourceMappingURL=product.js.map