"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logUsersRoute = void 0;
var index_1 = require("../middlewares/index");
var logUsesrData_1 = require("../controllers/logUsesrData");
var express_1 = __importDefault(require("express"));
var logUsersRoute = express_1.default.Router();
exports.logUsersRoute = logUsersRoute;
logUsersRoute.get('/logsdata/get-all', index_1.isAdmin, logUsesrData_1.getAllLogUsersData);
//# sourceMappingURL=logUsersData.js.map