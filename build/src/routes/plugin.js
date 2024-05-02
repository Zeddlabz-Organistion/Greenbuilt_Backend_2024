"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugInRoute = void 0;
var express_1 = __importDefault(require("express"));
var plugin_1 = require("../controllers/plugin");
var plugInRoute = express_1.default.Router();
exports.plugInRoute = plugInRoute;
plugInRoute.get('/plugin/get/:userId', plugin_1.getPlugInData);
//# sourceMappingURL=plugin.js.map