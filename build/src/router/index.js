"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Middlewares_1 = require("../logic/Middlewares");
class Router {
    router = (0, express_1.default)();
    config;
    DB;
    constructor(config) {
        this.config = config;
    }
    addEndpoint(endpoint, handler, options, db) {
        if (options.methods === undefined)
            throw new Error('No methods defined');
        for (const method of options.methods)
            this.processEndPoint(options, method, endpoint, handler);
    }
    processEndPoint(options, method, endpoint, handler) {
        if (method === undefined)
            return;
        options.useMiddleware && this.router[method](endpoint, (0, Middlewares_1.middlewares)());
        options.cors && this.router[method](endpoint, cors_1.default.apply(undefined));
        this.router[method](endpoint, handler);
    }
    getDefindedRoutes() {
        //@ts-ignore
        return this.router._router.stack.map(r => r.route);
    }
    MultibleEndpoints(endpoints) {
        endpoints.forEach((endpoint) => {
            this.addEndpoint(endpoint.path, endpoint.handler, endpoint.options);
        });
    }
    loadFolder(folderPath, DB) {
        fs_1.default.readdirSync(folderPath).forEach(file => {
            if (fs_1.default.statSync(path_1.default.join(folderPath, file)).isDirectory()) {
                this.loadFolder(path_1.default.join(folderPath, file), DB);
            }
            else {
                const { defualt } = require(path_1.default.join(folderPath, file));
                this.addEndpoint(defualt.path, defualt.handler, defualt.options, DB);
            }
        });
    }
    init() {
        return this.router.listen(this.config.server.port, () => {
            console.log(`Server started on port ${this.config.server.port}`);
        });
    }
}
exports.default = Router;
