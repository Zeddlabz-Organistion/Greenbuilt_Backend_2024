"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.monthlyPlanRoute = void 0;
var express_1 = __importDefault(require("express"));
var monthlyPlan_1 = require("../controllers/monthlyPlan");
var index_1 = require("./../middlewares/index");
var monthlyPlanRoute = express_1.default.Router();
exports.monthlyPlanRoute = monthlyPlanRoute;
monthlyPlanRoute.post('/monthly-plan/consumption/create', index_1.isCorporate, monthlyPlan_1.createMonthlyConsumptionPlan);
monthlyPlanRoute.post('/monthly-plan/consumption/approve/:monthlyPlanId', index_1.isAdmin, monthlyPlan_1.approveMonthlyConsumptionPlan);
monthlyPlanRoute.put('/monthly-plan/consumption/update', monthlyPlan_1.updateMonthlyConsumptionPlan);
monthlyPlanRoute.delete('/monthly-plan/consumption/delete/id/:monthlyPlanId', index_1.isAdmin, monthlyPlan_1.deleteMonthlyConsumptionById);
monthlyPlanRoute.delete('/monthly-plan/consumption/delete/plan-id/:monthlyPlanId', index_1.isAdmin, monthlyPlan_1.deleteByMonthlyConsumptionPlanId);
monthlyPlanRoute.get('/monthly-plan/consumption/get/:monthlyPlanId', index_1.isCorporate, monthlyPlan_1.getMonthlyConsumptionById);
monthlyPlanRoute.get('/monthly-plan/consumption/get-all/plan-id/:monthlyPlanId', index_1.isCorporate, monthlyPlan_1.getAllByMonthlyConsumptionId);
monthlyPlanRoute.get('/monthly-plan/consumption/get-all/user-id/:userId', index_1.isSameUserOrAdmin, monthlyPlan_1.getAllMonthlyConsumptionByUserId);
monthlyPlanRoute.get('/monthly-plan/consumption/get-all', index_1.isAdmin, monthlyPlan_1.getAllMonthlyConsumption);
//# sourceMappingURL=monthlyPlan.js.map