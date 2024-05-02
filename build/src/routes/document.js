"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentRoute = void 0;
var express_1 = __importDefault(require("express"));
var document_1 = require("../controllers/document");
var documentRoute = express_1.default.Router();
exports.documentRoute = documentRoute;
documentRoute.post('/document/upload/:userId', document_1.uploadDocument);
documentRoute.put('/document/update/:docId', document_1.updateDocument);
documentRoute.delete('/document/delete/:docId', document_1.deleteDocument);
documentRoute.get('/document/get/:docId', document_1.getDocumentById);
documentRoute.get('/document/get-all/:userId', document_1.getAllDocumentsByUser);
//# sourceMappingURL=document.js.map