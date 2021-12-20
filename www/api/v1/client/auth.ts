
import { IRouter } from '@type';
import { Authentication } from '@logic/auth';

export const defualt: IRouter.Endpoint = {
    handler: Authentication.login,
    options: {
        methods: ['post', 'get'],

    },
    path: '/api/v1/client',
};

