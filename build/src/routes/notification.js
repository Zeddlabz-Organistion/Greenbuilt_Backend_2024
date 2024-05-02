"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRoute = void 0;
var express_1 = __importDefault(require("express"));
var notification_1 = require("../controllers/notification");
var index_1 = require("./../middlewares/index");
var notificationRoute = express_1.default.Router();
exports.notificationRoute = notificationRoute;
notificationRoute.get('/notification/user/:userId', index_1.isSameUserOrAdmin, notification_1.getAllUserNotifications);
notificationRoute.get('/notifications', index_1.isAdmin, notification_1.getAllNotifications);
//# sourceMappingURL=notification.js.map