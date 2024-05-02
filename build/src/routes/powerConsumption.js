"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.powerConsumptionRoute = void 0;
var express_1 = __importDefault(require("express"));
var powerConsumption_1 = require("../controllers/powerConsumption");
var index_1 = require("./../middlewares/index");
var powerConsumptionRoute = express_1.default.Router();
exports.powerConsumptionRoute = powerConsumptionRoute;
powerConsumptionRoute.post('/power-consumption/create', index_1.isCorporate, powerConsumption_1.createEnergyConsumption);
powerConsumptionRoute.put('/power-consumption/update/:powerConsumptionId', powerConsumption_1.updateEnergyConsumption);
powerConsumptionRoute.delete('/power-consumption/delete/:powerConsumptionId', powerConsumption_1.deletePowerConsumption);
powerConsumptionRoute.get('/power-consumption/get/:powerConsumptionId', powerConsumption_1.getPowerConsumptionById);
powerConsumptionRoute.get('/power-consumption/get-all/user/:userId', powerConsumption_1.getAllPowerConsumptionByUser);
powerConsumptionRoute.get('/power-consumption/get-all', powerConsumption_1.getAllPowerConsumption);
powerConsumptionRoute.post('/power-consumption/approve/:powerConsumptionId', index_1.isAdmin, powerConsumption_1.approvePowerConsumption);
//# sourceMappingURL=powerConsumption.js.map