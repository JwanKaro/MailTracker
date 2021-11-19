"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defualt = void 0;
exports.defualt = {
    handler: (req, res) => {
        res.send('Hello world');
    },
    options: {
        methods: ['get'],
    },
    path: '/',
};
