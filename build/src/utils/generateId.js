"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDocumentId = void 0;
var generateDocumentId = function (num, size) {
    var s = num + '';
    while (s.length < size)
        s = '0' + s;
    return s;
};
exports.generateDocumentId = generateDocumentId;
//# sourceMappingURL=generateId.js.map