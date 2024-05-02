"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetRoute = void 0;
var index_1 = require("./../middlewares/index");
var express_1 = __importDefault(require("express"));
var asset_1 = require("../controllers/asset");
var assetRoute = express_1.default.Router();
exports.assetRoute = assetRoute;
assetRoute.post('/asset/upload/:userId', index_1.isAdmin, asset_1.createAsset);
assetRoute.post('/asset/bulk-upload/:userId', index_1.isAdmin, asset_1.bulkUpload);
assetRoute.put('/asset/update/:assetId', index_1.isAdmin, asset_1.updateAsset);
assetRoute.delete('/asset/delete/:assetId', index_1.isAdmin, asset_1.deleteAsset);
assetRoute.get('/asset/get/:assetId', index_1.isAdmin, asset_1.getAssetById);
assetRoute.get('/asset/get-all', index_1.isAdmin, asset_1.getAllAssets);
assetRoute.get('/asset/get-all/user/:userId', index_1.isAdmin, asset_1.getAllUserAssets);
//# sourceMappingURL=asset.js.map