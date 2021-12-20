import { TrackerMain } from './TrackerMain';
import express from 'express';
import { ITracker } from '../../@types/index';

export class Tracker extends TrackerMain {



    /**
     * track 
     */
    public static async track(req: express.Request, res: express.Response) {
        if (!req.isAuthenticated || !req.token) return res.status(401).send('Unauthorized');
        const { data } = req.token;
        if (!req.body.data) return res.status(400).send('Bad Request');
        const token = await Tracker.generateToken(data.clientId, req.body.data);
        res.setHeader('Content-Type', 'application/json');
        res.send(
            JSON.stringify(
                {
                    token,
                    trackableUrl: `${req.hostname}/img/${token}.png`
                }
            )
        );
    }




    static parameters = {
        token: ":token",
        userId: ":userId",
        clientId: ":clientId"
    }

    public static confirm(req: express.Request, res: express.Response) {
        if (req.params[this.parameters.token.replace(":", "")] == undefined) return res.status(404).send("");

        const {
            link,
            ip,
            device
        }
            =
        {
            link: req.params.token,
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || "unknown",
            device: req.headers['user-agent'] || 'unknown'
        }
        Tracker.emitView(link, device, Array.isArray(ip) ? ip.join(',') : ip);
        res.set('Content-Type', 'image/png');
        res.end(Buffer.from([
            137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 196, 137, 0, 0, 0, 13, 73, 68, 65, 84, 8, 153, 99, 96, 96, 96, 96, 0, 0, 0, 5, 0, 1, 135, 161, 78, 212, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130
        ]), 'binary');
    }



    /**
     * Gets track status from database. It returns object with status and data
     */
    static async getTrackStatusByToken(req: express.Request, res: express.Response) {
        if (!req.isAuthenticated || !req.token) return res.status(401).send('Unauthorized');
        const { data } = req.token;
        if (!req.params.token) return res.status(400).send('Bad Request');
        const token = req.params.token;

    }
    static async getTrackedLinksByUserId(req: express.Request, res: express.Response) {
        if (!req.isAuthenticated || !req.token) return res.status(401).send('Unauthorized');
        const { data } = req.token;
        if (!req.params.userId) return res.status(400).send('Bad Request');
        const userId = req.params.userId;
        const track = await this.searchInCollection({ userId });
        if (!track) return res.status(404).send('Not Found');
        res.setHeader('Content-Type', 'application/json');
        res.send(
            JSON.stringify(
                {
                    track
                }
            )
        );
    }
}
