import express from 'express';

export class Tracker {

    static uriParmeter = ':token'
    public static processRequest(req: express.Request) {
        const link = req.params.token;
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || "unknown";
        const device = req.headers['user-agent'] || 'unknown';

        Tracker.emitView(link, device, Array.isArray(ip) ? ip.join(',') : ip);
        return true;
    }

    /**
     * Emits view and save it to database 
     * @param link 
     * @param device 
     * @param ip 
     */
    private static async emitView(token: string, device: string, ip: string) {
 
        try {

            await process.app.SafeDB.realDB.collection(process.app.config.app.database.tracker.name).updateOne({ "token": token }, {
                $set: {
                    hasSeen: true,
                    lastSeen: new Date(),
                },
                $push: {
                    "details.timesSeen":
                    {
                        time: new Date(),
                        device: device,
                        ip: ip
                    }

                },
                $inc: {
                    "details.numOfTimesSeen": 1
                }
            });
            process.app.eventManager.emit('email:opened', {
                link: token,
                device: device,
                ip: ip
            });


        } catch (e) {
            console.log(e);
        }
    }



}
