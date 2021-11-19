"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
// response with error and 401 status code
const error = (res, message, statusCode) => {
    res.status(statusCode).json({
        status: 'error',
        message,
    });
};
exports.error = error;
