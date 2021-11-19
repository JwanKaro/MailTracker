import cors from 'cors';
import express from 'express';
import { router, IConfig, ValuesOf } from '../types';
import fs from 'fs'
import path from 'path';
import DB from '../database/index';
import { middlewares } from '../logic/Middlewares';
class Router {
    private readonly router = express();
    readonly config;
    private DB!: DB;
    constructor(config: IConfig) {
        this.config = config;
    }

    addEndpoint(endpoint: string, handler: router.Handler, options: router.Options, db?: DB): void {
        if (options.methods === undefined) throw new Error('No methods defined');

        for (const method of options.methods)
            this.processEndPoint(options, method, endpoint, handler);

    }

    private processEndPoint(options: router.Options, method: ValuesOf<router.Methods>, endpoint: string, handler: router.Handler) {
        if (method === undefined) return;
        options.useMiddleware && this.router[method](endpoint, middlewares());
        options.cors && this.router[method](endpoint, cors.apply(undefined));
        this.router[method](endpoint, handler);
    }

    getDefindedRoutes() {
        //@ts-ignore
        return this.router._router.stack.map(r => r.route);
    }


    MultibleEndpoints(endpoints: router.Endpoint[]) {
        endpoints.forEach((endpoint) => {
            this.addEndpoint(endpoint.path, endpoint.handler, endpoint.options);
        });
    }


    loadFolder(folderPath: string, DB?: DB) {
        fs.readdirSync(folderPath).forEach(file => {
            if (fs.statSync(path.join(folderPath, file)).isDirectory()) {
                this.loadFolder(path.join(folderPath, file), DB);
            } else {
                const { defualt } = require(path.join(folderPath, file));
                this.addEndpoint(defualt.path, defualt.handler, defualt.options, DB);
            }
        });

    }
    public init() {
        return this.router.listen(this.config.server.port, () => {
            console.log(`Server started on port ${this.config.server.port}`);
        });

    }


}


export default Router;