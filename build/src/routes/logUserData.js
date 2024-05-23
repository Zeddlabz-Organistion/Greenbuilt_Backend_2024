"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logUserRoute = void 0;
var index_1 = require("./../middlewares/index");
var express_1 = __importDefault(require("express"));
require();
var logUserRoute = express_1.default.Router();
exports.logUserRoute = logUserRoute;
logUserRoute.get('/logdata/get-all', index_1.isAdmin);
//# sourceMappingURL=logUserData.js.map