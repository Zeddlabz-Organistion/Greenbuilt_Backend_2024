"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.qrRoute = void 0;
var express_1 = __importDefault(require("express"));
var qrCode_1 = require("../controllers/qrCode");
var index_1 = require("./../middlewares/index");
var qrRoute = express_1.default.Router();
exports.qrRoute = qrRoute;
qrRoute.get('/qr/history/generate/get-all', index_1.isAdmin, qrCode_1.getAllGeneratedQRs);
qrRoute.get('/qr/history/consume/get-all', index_1.isAdmin, qrCode_1.getAllConsumedQRs);
qrRoute.post('/qr/generate/:productId', index_1.isCorporate, qrCode_1.generateQRCode);
qrRoute.post('/qr/generate-multiple/:productId', index_1.isCorporate, qrCode_1.generateMultipleQRCodes);
qrRoute.post('/qr/get-all/query', index_1.isCorporate, qrCode_1.getAllQRsByQuery);
qrRoute.post('/qr/search', index_1.isCorporate, qrCode_1.getQRBySearchTerm);
qrRoute.post('/qr/consume/:qrId', qrCode_1.consumeQRCode);
qrRoute.get('/qr/history/generate/:userId', index_1.isCorporate, qrCode_1.getGeneratedQRs);
qrRoute.get('/qr/history/consume/:userId', qrCode_1.getConsumedQRs);
//# sourceMappingURL=qrCode.js.map