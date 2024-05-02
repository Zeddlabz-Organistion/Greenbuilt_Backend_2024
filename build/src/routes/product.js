"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
var express_1 = __importDefault(require("express"));
var product_1 = require("../controllers/product");
var index_1 = require("./../middlewares/index");
var productRoute = express_1.default.Router();
exports.productRoute = productRoute;
productRoute.post('/product/create', index_1.isCorporate, product_1.createProduct);
productRoute.post('/product/bulk-upload', index_1.isCorporate, product_1.bulkUpload);
productRoute.get('/product/get/:productId', index_1.isCorporate, product_1.getProduct);
productRoute.get('/product/get-all/corporate', index_1.isCorporate, product_1.getAllCorporateProducts);
productRoute.post('/product/get-all/query', index_1.isCorporate, product_1.getAllProductsByQuery);
productRoute.post('/product/search', index_1.isCorporate, product_1.getProductsBySearchTerm);
productRoute.delete('/product/delete/:productId', index_1.isCorporate, product_1.deleteProduct);
productRoute.get('/product/get-all/admin', index_1.isAdmin, product_1.getAllProducts);
productRoute.post('/product/approve/:productId', index_1.isAdmin, product_1.approveProduct);
productRoute.put('/product/update-points/:productId', index_1.isAdmin, product_1.updateProductPoints);
//# sourceMappingURL=product.js.map