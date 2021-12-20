import cors from 'cors';
import express from 'express';
import { IRouter, IConfig } from '@type';
import fs from 'fs'
import path from 'path';
import { Authentication } from '../logic/auth/index';

export class Router {
    private readonly Router = express();
    readonly config;

    constructor(config: IConfig) {
        this.config = config;
    }

    addEndpoint(params: IRouter.Endpoint): void {
        if (params.options.methods === undefined) throw new Error('No methods defined');
        for (const method of params.options.methods) this.processEndPoint(method, params);

    }

    private processEndPoint(method: IRouter.Method, params: IRouter.Endpoint) {
        const path = params.path

        params.options.cors && this.Router[method](path, cors.apply(undefined));
        params.options.requireAuth && this.Router[method](path, Authentication.verifyRequest);
        this.Router[method](path, params.handler);

        // console.log(`${method} ${path}`);

    }

    getDefindedRoutes() {
        return this.Router._router;
    }


    MultibleEndpoints(endpoints: IRouter.Endpoint[]) {
        endpoints.forEach((endpoint) => {
            this.addEndpoint(endpoint);
        });
    }


    async loadFolder(folderPath: string) {
        const files = fs.readdirSync(folderPath)
        await files.forEach(async file => {
            if (fs.statSync(path.join(folderPath, file)).isDirectory()) {
                this.loadFolder(path.join(folderPath, file));
            } else {
                const { defualt } = await import(path.join(folderPath, file));
                this.addEndpoint(defualt);
            }
        });

    }
    public init = () =>  this.Router.listen(this.config.server.port)

}


export default IRouter;