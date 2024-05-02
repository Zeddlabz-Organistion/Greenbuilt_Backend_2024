"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var index_1 = require("./../middlewares/index");
var auth_1 = require("./auth");
var statics_1 = require("./statics");
var user_1 = require("./user");
var qrCode_1 = require("./qrCode");
var product_1 = require("./product");
var document_1 = require("./document");
var asset_1 = require("./asset");
var statistics_1 = require("./statistics");
var powerConsumption_1 = require("./powerConsumption");
var monthlyPlan_1 = require("./monthlyPlan");
var notification_1 = require("./notification");
var plugin_1 = require("./plugin");
var routes = function (app) {
    app.use('/api', auth_1.authRoute);
    app.use('/api', statics_1.staticRoutes);
    app.use('/api', plugin_1.plugInRoute);
    app.use('/api', index_1.isSignedIn, index_1.isValidToken, document_1.documentRoute);
    app.use('/api', index_1.isSignedIn, index_1.isValidToken, user_1.userRoute);
    app.use('/api', index_1.isSignedIn, index_1.isValidToken, statistics_1.statisticsRoute);
    app.use('/api', index_1.isSignedIn, index_1.isValidToken, qrCode_1.qrRoute);
    app.use('/api', index_1.isSignedIn, index_1.isValidToken, product_1.productRoute);
    app.use('/api', index_1.isSignedIn, index_1.isValidToken, asset_1.assetRoute);
    app.use('/api', index_1.isSignedIn, index_1.isValidToken, powerConsumption_1.powerConsumptionRoute);
    app.use('/api', index_1.isSignedIn, index_1.isValidToken, monthlyPlan_1.monthlyPlanRoute);
    app.use('/api', index_1.isSignedIn, index_1.isValidToken, notification_1.notificationRoute);
    return app;
};
exports.routes = routes;
//# sourceMappingURL=index.js.map