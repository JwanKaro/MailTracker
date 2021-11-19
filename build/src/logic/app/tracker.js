"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracker = void 0;
class Tracker {
    static uriParmeter = ':token';
    static processRequest(req) {
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
    static async emitView(token, device, ip) {
        try {
            await process.app.SafeDB.realDB.collection(process.app.config.app.database.tracker.name).updateOne({ "token": token }, {
                $set: {
                    hasSeen: true,
                    lastSeen: new Date(),
                },
                $push: {
                    "details.timesSeen": {
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
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.Tracker = Tracker;
