import { IRouter } from "@type";
import { Authentication } from "@logic/auth";

export const defualt: IRouter.Endpoint = {
    handler: Authentication.createClient,
    options: {
        methods: ['put'],
    },
    path: '/api/v1/client',
};

