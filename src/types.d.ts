import { MongoOptions, ServerHeartbeatFailedEvent } from "mongodb";
import express, { Request } from 'express';
import { Middlewares } from "./logic/Middlewares";
import App from './app';
import config from "../main.config";
config

type ValuesOf<T extends any[]> = T[number];
namespace router {
    declare type Handler = (req: req<Options>, res: express.Response, next: express.NextFunction) => void;
    declare type Methods = ["get"?, "post"?, "put"?, "delete"?, "patch"?, "head"?, "options"?, "all"?]
    declare type method = ValuesOf<Methods>[];
    declare type Options = {
        cors?: boolean;
        methods: method;
        useMiddleware?: boolean;
    }

    interface Endpoint {
        path: string;
        handler: Handler;
        options: Options;
    }
    type routs = route[]

    interface route {
        path: string;
        component: string;
    }
    type routeHanlder = { path: string, handler: Handler, options: Options };
    type req<T> = Request & {
        middlewares?: Middlewares
    }


}







type IConfigDb = {
    url: string,
    options?: MongoOptions,
    name: string
};

interface IConfig {
    db: IConfigMongoose,
    server: {
        port: number
    },
    app: {
        name: string
        database: {
            tracker: {
                name: string
            }
        }
    }

}



declare global {
    namespace NodeJS {
        interface Process {
            app: App
        }
    }
}
