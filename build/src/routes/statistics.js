"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statisticsRoute = void 0;
var express_1 = __importDefault(require("express"));
var statistics_1 = require("../controllers/statistics");
var index_1 = require("./../middlewares/index");
var statisticsRoute = express_1.default.Router();
exports.statisticsRoute = statisticsRoute;
statisticsRoute.get('/statistics/corporate/get-all', index_1.isCorporate, statistics_1.getAllCorporateStatistics);
statisticsRoute.get('/statistics/admin/get-all', index_1.isAdmin, statistics_1.getAllAdminStatistics);
//# sourceMappingURL=statistics.js.map