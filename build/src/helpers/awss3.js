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
exports.getObjectUrl = exports.getSignedUrlForDocs = void 0;
var client_s3_1 = require("@aws-sdk/client-s3");
var s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
var s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY
    }
});
function getSignedUrlForDocs(folderName, fileName, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var key, params, command, url, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    key = folderName + "/" + userId + "_" + fileName;
                    params = {
                        Bucket: process.env.AWS_S3_BUCKET,
                        Key: key,
                        ContentType: 'document/*'
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    command = new client_s3_1.PutObjectCommand(params);
                    return [4, (0, s3_request_presigner_1.getSignedUrl)(s3Client, command)];
                case 2:
                    url = _a.sent();
                    if (!url || !key) {
                        throw new Error('Failed to generate signed URL or key');
                    }
                    return [2, { url: url, key: key }];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error generating signed URL for document:', error_1);
                    throw new Error('Could not generate signed URL');
                case 4: return [2];
            }
        });
    });
}
exports.getSignedUrlForDocs = getSignedUrlForDocs;
var getObjectUrl = function (key) { return __awaiter(void 0, void 0, void 0, function () {
    var params, command, url, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = {
                    Bucket: process.env.AWS_S3_BUCKET,
                    Key: key,
                    Expires: 15 * 60
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                command = new client_s3_1.GetObjectCommand(params);
                return [4, (0, s3_request_presigner_1.getSignedUrl)(s3Client, command)];
            case 2:
                url = _a.sent();
                if (!url) {
                    throw new Error('Failed to generate signed URL');
                }
                return [2, url];
            case 3:
                error_2 = _a.sent();
                console.error('Error generating signed URL for object:', error_2);
                throw new Error('Could not generate signed URL');
            case 4: return [2];
        }
    });
}); };
exports.getObjectUrl = getObjectUrl;
//# sourceMappingURL=awss3.js.map