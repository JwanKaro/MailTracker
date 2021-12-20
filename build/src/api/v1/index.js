"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defualt = void 0;
const tracker_1 = require("../../logic/app/tracker");
exports.defualt = {
    handler: async (req, res, next) => {
        if (req.middlewares == undefined)
            return res.status(500).send();
        if (req.params[tracker_1.Tracker.uriParmeter.replace(":","")] == undefined)
            return res.status(400).send('AppId not defined');
        tracker_1.Tracker.processRequest(req);
        var buf = Buffer.from([
            0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00,
            0x80, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x2c,
            0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02,
            0x02, 0x44, 0x01, 0x00, 0x3b
        ]);
        res.set('Content-Type', 'image/png');
        res.end(buf, 'binary');
    },
    options: {
        methods: ['get'],
        cors: true,
        useMiddleware: true,
    },
    path: '/v1/' + tracker_1.Tracker.uriParmeter + '.png'
};
