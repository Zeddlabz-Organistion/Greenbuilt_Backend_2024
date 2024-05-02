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
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var formidable_1 = __importDefault(require("formidable"));
var fs_1 = __importDefault(require("fs"));
var sharp_1 = __importDefault(require("sharp"));
var index_1 = require("../prisma/index");
var logger_1 = require("../utils/logger");
var statusCode_1 = require("../utils/statusCode");
var uuid_1 = require("uuid");
var lodash_1 = require("lodash");
var crud_1 = require("../helpers/crud");
var s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
    region: 'ap-south-1'
});
var uploadDocument = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, form;
    return __generator(this, function (_a) {
        userId = +(req.params.userId || '0');
        try {
            form = new formidable_1.default.IncomingForm();
            form.parse(req, function (err, fields, _a) {
                var file = _a.file;
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
                    var title = fields.title;
                    console.log(file);
                    var dataS3 = {
                        Bucket: 'green-built-documents',
                        Key: title + "-" + userId,
                        Body: fs_1.default.createReadStream(file.filepath),
                        ContentType: file.mimetype
                    };
                    var data_1 = {
                        title: "" + title,
                        docId: (0, uuid_1.v4)(),
                        uploadDate: new Date(),
                        fileName: file.originalFilename,
                        userId: userId,
                        location: ''
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
                            data_1.location = response.Location;
                            (0, crud_1.create)(index_1.prisma.document, data_1)
                                .then(function (responseData) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4, index_1.prisma.user
                                                .update({
                                                where: {
                                                    id: userId
                                                },
                                                data: {
                                                    documentArray: { push: response.Location }
                                                }
                                            })
                                                .then(function (USER) {
                                                return res.status(statusCode_1.statusCode.OK).json({
                                                    message: 'Document uploaded sucessfully!',
                                                    data: responseData,
                                                    USER: USER
                                                });
                                            })
                                                .catch(function (err) {
                                                (0, logger_1.loggerUtil)(err, 'ERROR');
                                                res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                                    error: 'Error while uploading Document'
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
                                return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                    error: 'Error while uploading document'
                                });
                            });
                        }
                        return;
                    });
                }
            });
        }
        catch (err) {
            (0, logger_1.loggerUtil)(err, 'ERROR');
        }
        finally {
            (0, logger_1.loggerUtil)("Upload document API Called!");
        }
        return [2];
    });
}); };
exports.uploadDocument = uploadDocument;
var updateDocument = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var docId, form, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                docId = req.params.docId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                form = new formidable_1.default.IncomingForm();
                return [4, form.parse(req, function (err, fields, _a) {
                        var file = _a.file;
                        return __awaiter(void 0, void 0, void 0, function () {
                            var title;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (err) {
                                            (0, logger_1.loggerUtil)(err, 'ERROR');
                                            res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                                error: 'Problem with document'
                                            });
                                        }
                                        title = fields.title;
                                        if (!file) return [3, 1];
                                        if (file.size > 3000000) {
                                            res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                                error: 'File size should be less than 3 MB'
                                            });
                                        }
                                        (0, sharp_1.default)(fs_1.default.readFileSync(file.filepath))
                                            .resize(1000)
                                            .toBuffer()
                                            .then(function (doc) { return __awaiter(void 0, void 0, void 0, function () {
                                            var data;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        data = {
                                                            file: doc,
                                                            fileName: file.originalFilename
                                                        };
                                                        if (!(0, lodash_1.isEmpty)(title))
                                                            data.title = title;
                                                        return [4, (0, crud_1.updateById)(index_1.prisma.document, data, 'docId', docId)
                                                                .then(function (data) {
                                                                return res.status(statusCode_1.statusCode.OK).json({
                                                                    message: 'Document updated sucessfully!',
                                                                    data: data
                                                                });
                                                            })
                                                                .catch(function (err) {
                                                                (0, logger_1.loggerUtil)(err, 'ERROR');
                                                                return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                                                    error: 'Error while updating document'
                                                                });
                                                            })];
                                                    case 1:
                                                        _a.sent();
                                                        return [2];
                                                }
                                            });
                                        }); });
                                        return [3, 4];
                                    case 1:
                                        if (!title) return [3, 4];
                                        return [4, (0, crud_1.updateById)(index_1.prisma.document, { title: title }, 'docId', docId)
                                                .then(function (data) {
                                                return res.status(statusCode_1.statusCode.OK).json({
                                                    message: 'Document updated sucessfully!',
                                                    data: data
                                                });
                                            })
                                                .catch(function (err) {
                                                (0, logger_1.loggerUtil)(err, 'ERROR');
                                                return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                                    error: 'Error while updating document'
                                                });
                                            })];
                                    case 2: return [4, _b.sent()];
                                    case 3:
                                        _b.sent();
                                        _b.label = 4;
                                    case 4: return [2];
                                }
                            });
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
                (0, logger_1.loggerUtil)("Update document API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.updateDocument = updateDocument;
var deleteDocument = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var docId, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                docId = req.params.docId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_1.deleteById)(index_1.prisma.document, 'docId', docId)
                        .then(function () {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Document deleted sucessfully!'
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Error while deleting document'
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
                (0, logger_1.loggerUtil)("Delete document API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.deleteDocument = deleteDocument;
var getDocumentById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var docId, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                docId = req.params.docId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, (0, crud_1.getById)(index_1.prisma.document, 'docId', docId)
                        .then(function (data) {
                        if ((0, lodash_1.isEmpty)(data)) {
                            return res.status(statusCode_1.statusCode.NOT_FOUND).json({
                                message: 'No document was found!'
                            });
                        }
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Document fetched sucessfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Error while fetching document'
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
                (0, logger_1.loggerUtil)("Get document API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getDocumentById = getDocumentById;
var getAllDocumentsByUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, err_4;
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
                err_4 = _a.sent();
                (0, logger_1.loggerUtil)(err_4, 'ERROR');
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