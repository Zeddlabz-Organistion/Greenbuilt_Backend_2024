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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDocumentsByUser = exports.getDocumentById = exports.deleteDocument = exports.updateDocument = exports.uploadDocument = void 0;
var formidable_1 = __importDefault(require("formidable"));
var fs_1 = __importDefault(require("fs"));
var sharp_1 = __importDefault(require("sharp"));
var index_1 = require("../prisma/index");
var logger_1 = require("../utils/logger");
var statusCode_1 = require("../utils/statusCode");
var uuid_1 = require("uuid");
var lodash_1 = require("lodash");
var awss3_1 = require("../helpers/awss3");
var crud_1 = require("../helpers/crud");
var awss3_2 = require("../helpers/awss3");
var logUser_1 = require("../helpers/logUser");
var uploadDocument = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, fileName, title, _b, url, key, data, user, updateError_1, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                userId = Number(req.params.userId || '0');
                _c.label = 1;
            case 1:
                _c.trys.push([1, 8, 9, 10]);
                _a = req.body, fileName = _a.fileName, title = _a.title;
                return [4, (0, awss3_2.getSignedUrlForDocs)('document', fileName, userId)];
            case 2:
                _b = _c.sent(), url = _b.url, key = _b.key;
                data = {
                    title: title,
                    docId: (0, uuid_1.v4)(),
                    uploadDate: new Date(),
                    fileName: fileName,
                    userId: userId,
                    location: key
                };
                _c.label = 3;
            case 3:
                _c.trys.push([3, 6, , 7]);
                return [4, (0, crud_1.create)(index_1.prisma.document, data)];
            case 4:
                _c.sent();
                return [4, index_1.prisma.user.update({
                        where: { id: userId },
                        data: { documentArray: { push: key } }
                    })];
            case 5:
                user = _c.sent();
                (0, logUser_1.loguser)(user.id, user.name, user.role, 'Document upload initiated', res);
                return [2, res.status(200).json({
                        message: 'Signed URL generated successfully',
                        url: url
                    })];
            case 6:
                updateError_1 = _c.sent();
                if (updateError_1 instanceof Error) {
                    (0, logger_1.loggerUtil)(updateError_1.message, 'ERROR');
                }
                else {
                    (0, logger_1.loggerUtil)('Unknown error during document update', 'ERROR');
                }
                return [2, res
                        .status(400)
                        .json({ error: 'Error while updating document information' })];
            case 7: return [3, 10];
            case 8:
                err_1 = _c.sent();
                if (err_1 instanceof Error) {
                    (0, logger_1.loggerUtil)(err_1.message, 'ERROR');
                }
                else {
                    (0, logger_1.loggerUtil)('Unknown error during signed URL generation', 'ERROR');
                }
                return [2, res.status(500).json({ error: 'Internal server error' })];
            case 9:
                (0, logger_1.loggerUtil)('Upload document API Called!');
                return [7];
            case 10: return [2];
        }
    });
}); };
exports.uploadDocument = uploadDocument;
var updateDocument = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var docId, form;
    return __generator(this, function (_a) {
        docId = req.params.docId;
        try {
            form = new formidable_1.default.IncomingForm();
            form.parse(req, function (err, fields, files) { return __awaiter(void 0, void 0, void 0, function () {
                var title, file, doc, data, updatedDocument, userData, err_2, updatedDocument, userData, err_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (err) {
                                (0, logger_1.loggerUtil)(err, 'ERROR');
                                return [2, res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                        error: 'Problem with document'
                                    })];
                            }
                            title = fields.title;
                            file = files.file;
                            if (!file) return [3, 7];
                            if (file.size > 3000000) {
                                return [2, res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                        error: 'File size should be less than 3 MB'
                                    })];
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 5, , 6]);
                            return [4, (0, sharp_1.default)(fs_1.default.readFileSync(file.filepath))
                                    .resize(1000)
                                    .toBuffer()];
                        case 2:
                            doc = _a.sent();
                            data = {
                                file: doc,
                                fileName: file.originalFilename
                            };
                            if (title)
                                data.title = title;
                            return [4, (0, crud_1.updateById)(index_1.prisma.document, data, 'docId', docId)];
                        case 3:
                            updatedDocument = _a.sent();
                            return [4, (0, crud_1.getById)(index_1.prisma.user, 'id', req.auth._id)];
                        case 4:
                            userData = _a.sent();
                            (0, logUser_1.loguser)(userData === null || userData === void 0 ? void 0 : userData.id, userData === null || userData === void 0 ? void 0 : userData.name, userData === null || userData === void 0 ? void 0 : userData.role, "Document updated successfully. document id is " + docId, res);
                            return [2, res.status(statusCode_1.statusCode.OK).json({
                                    message: 'Document updated successfully!',
                                    data: updatedDocument
                                })];
                        case 5:
                            err_2 = _a.sent();
                            (0, logger_1.loggerUtil)(err_2, 'ERROR');
                            return [2, res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                    error: 'Error while updating document'
                                })];
                        case 6: return [3, 14];
                        case 7:
                            if (!title) return [3, 13];
                            _a.label = 8;
                        case 8:
                            _a.trys.push([8, 11, , 12]);
                            return [4, (0, crud_1.updateById)(index_1.prisma.document, { title: title }, 'docId', docId)];
                        case 9:
                            updatedDocument = _a.sent();
                            return [4, (0, crud_1.getById)(index_1.prisma.user, 'id', updatedDocument.userId)];
                        case 10:
                            userData = _a.sent();
                            (0, logUser_1.loguser)(userData === null || userData === void 0 ? void 0 : userData.id, userData === null || userData === void 0 ? void 0 : userData.name, userData === null || userData === void 0 ? void 0 : userData.role, "Document updated successfully!", res);
                            return [2, res.status(statusCode_1.statusCode.OK).json({
                                    message: 'Document updated successfully!',
                                    data: updatedDocument
                                })];
                        case 11:
                            err_3 = _a.sent();
                            (0, logger_1.loggerUtil)(err_3, 'ERROR');
                            return [2, res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                    error: 'Error while updating document'
                                })];
                        case 12: return [3, 14];
                        case 13: return [2, res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                error: 'No file or title provided'
                            })];
                        case 14: return [2];
                    }
                });
            }); });
        }
        catch (err) {
            (0, logger_1.loggerUtil)(err, 'ERROR');
            return [2, res.status(statusCode_1.statusCode.INTERNAL_SERVER_ERROR).json({
                    error: 'Internal server error'
                })];
        }
        finally {
            (0, logger_1.loggerUtil)("Update document API Called!");
        }
        return [2];
    });
}); };
exports.updateDocument = updateDocument;
var deleteDocument = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, docId, userData, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.auth._id;
                docId = req.params.docId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, 5, 6]);
                return [4, (0, crud_1.deleteById)(index_1.prisma.document, 'docId', docId)];
            case 2:
                _a.sent();
                return [4, (0, crud_1.getById)(index_1.prisma.user, 'id', userId)];
            case 3:
                userData = _a.sent();
                (0, logUser_1.loguser)(userData === null || userData === void 0 ? void 0 : userData.id, userData === null || userData === void 0 ? void 0 : userData.name, userData === null || userData === void 0 ? void 0 : userData.role, "Document deleted successfully!", res);
                return [2, res.status(statusCode_1.statusCode.OK).json({
                        message: 'Document deleted successfully!'
                    })];
            case 4:
                err_4 = _a.sent();
                (0, logger_1.loggerUtil)(err_4, 'ERROR');
                return [2, res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                        error: 'Error while deleting document'
                    })];
            case 5:
                (0, logger_1.loggerUtil)("Delete document API Called!");
                return [7];
            case 6: return [2];
        }
    });
}); };
exports.deleteDocument = deleteDocument;
var getDocumentById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var docId, data, url, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                docId = req.params.docId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, 5, 6]);
                return [4, (0, crud_1.getById)(index_1.prisma.document, 'docId', docId)];
            case 2:
                data = _a.sent();
                if ((0, lodash_1.isEmpty)(data)) {
                    return [2, res.status(statusCode_1.statusCode.NOT_FOUND).json({
                            message: 'No document was found!'
                        })];
                }
                return [4, (0, awss3_1.getObjectUrl)(data.location)];
            case 3:
                url = _a.sent();
                data.url = url;
                return [2, res.status(statusCode_1.statusCode.OK).json({
                        message: 'Document fetched successfully!',
                        data: data
                    })];
            case 4:
                err_5 = _a.sent();
                (0, logger_1.loggerUtil)(err_5, 'ERROR');
                return [2, res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                        error: 'Error while fetching document'
                    })];
            case 5:
                (0, logger_1.loggerUtil)("Get document API Called!");
                return [7];
            case 6: return [2];
        }
    });
}); };
exports.getDocumentById = getDocumentById;
var getAllDocumentsByUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = +(req.params.userId || '0');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, index_1.prisma.document
                        .findMany({ where: { userId: userId }, include: { user: true } })
                        .then(function (data) {
                        if ((0, lodash_1.isEmpty)(data)) {
                            return res.status(statusCode_1.statusCode.NOT_FOUND).json({
                                message: 'No document was found!'
                            });
                        }
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'User Document fetched sucessfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Error while fetching user documents'
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
                (0, logger_1.loggerUtil)("Get user documents API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getAllDocumentsByUser = getAllDocumentsByUser;
//# sourceMappingURL=document.js.map