"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewares = exports.Middlewares = void 0;
const tokenGenerator_1 = require("./app/tokenGenerator");
const tracker_1 = require("./app/tracker");
class Middlewares {
    constructor() {
    }
    linkGenerator() {
        return new tokenGenerator_1.tokenGenerator();
    }
    Tracker() {
        return new tracker_1.Tracker();
    }
}
exports.Middlewares = Middlewares;
;
const middlewares = () => {
    const _Middlewares = new Middlewares();
    return (req, res, next) => {
        // @ts-ignore
        req.middlewares = req.middlewares || _Middlewares;
        next();
    };
};
exports.middlewares = middlewares;
