import { Tracker } from '@src/logic/app/tracker';
import { router } from '@src/types';
export const defualt: router.routeHanlder = {
    handler: async (req, res, next) => {
        if (req.middlewares == undefined) return res.status(500).send();
        if (req.params[Tracker.uriParmeter] == undefined) return res.status(400).send('AppId not defined');

        Tracker.processRequest(req);

        var buf = Buffer.from([
            0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00,
            0x80, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x2c,
            0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02,
            0x02, 0x44, 0x01, 0x00, 0x3b]);

        res.set('Content-Type', 'image/png');
        res.end(buf, 'binary');

    }
    ,
    options: {
        methods: ['get'],
        cors: true,
        useMiddleware: true,
    },
    path: '/v1/' + Tracker.uriParmeter + '.png'
};