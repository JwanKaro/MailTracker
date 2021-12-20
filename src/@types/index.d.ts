import { MongoOptions } from "mongodb";
import express from 'express';
import App from "../app"
import { JwtPayload } from "jsonwebtoken";

type ValuesOf<T extends unknown[]> = T[number];
export namespace IRouter {

    declare type Method = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';


    declare type Options = {
        cors?: boolean;
        methods: Method[];
        requireAuth?: boolean;
    }

    export interface Endpoint {
        path: string;
        handler: express.Handler;
        options: Options;
    }

    export type Token = {
        data: any,
    }
 
    export type ProssesEndPoint = {
        method: Method,
        options: Options,
        path:string,
    }


}


export namespace Auth {
    export interface Client {
        key: string;
        secret: string;
    }
    export interface Token {
        token: string;
        client: string;
        expires: Date;
        scope: string[];
    }
}


export namespace ITracker {
    export interface data {
        token: string
        data: any
        clientId: string
        details: {
            hasSeen: boolean,
            lastSeen: null | Date,
            numOfTimesSeen: number,
            createdAt: Date,
            timesSeen:
            [
                {
                    time: Date,
                    device: string,
                    ip: string,
                }
            ]
        }
    }

    export interface Search {
        parameter: {
            [key: string]: string
        }
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
        port: number | string,
        enteryPoint: string,
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
    declare namespace Express {
        export interface Request {
            token: Token | JwtPayload,
            isAuthenticated: boolean
        }
    }

}

