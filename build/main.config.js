"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const config = {
    db: {
        url: process.env.mongodbUrl || 'mongodb://127.0.0.1:27017',
        name: 'MailTracker',
    },
    server: {
        port: process.env.PORT || 3000,
    },
    app: {
        name: 'Mail tracker',
        database: {
            tracker: {
                name: 'tracker'
            },
        },
    },
};
exports.default = config;