import { ITracker } from "../../@types/index";

export abstract class TrackerMain {


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected static async generateToken(clientId: string, data: any): Promise<string> {
        const token = await this.generateUniqueToken();
        await this.saveToken(token, clientId, data);
        return token;
    }

    /**
 * Emits view and save it to database 
 * @param link 
 * @param device 
 * @param ip 
 */
    protected static async emitView(token: string, device: string, ip: string) {

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


    protected static async searchInCollection(param:ITracker.Search["parameter"]) {
        return await process.app.SafeDB.realDB.collection(process.app.config.app.database.tracker.name).findOne(param);
    }



    private static async generateUniqueToken(): Promise<string> {
        const token = this.uuidv4();
        const tokenExists = await this.checkTokenExists(token);
        if (tokenExists) {
            return this.generateUniqueToken();
        } else {
            return token;
        }
    }

    private static uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }



    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static async saveToken(token: string, clientId: string, data: any) {

        await process.app.SafeDB.realDB.collection(process.app.config.app.database.tracker.name).insertOne(
            {
                token,
                data,
                clientId,
                details: {
                    hasSeen: false,
                    lastSeen: null,
                    numOfTimesSeen: 0,
                    createdAt: new Date(),
                    timesSeen: []
                }
            });
    }
    private static async checkTokenExists(token: string) {
        return await process.app.SafeDB.realDB.collection(process.app.config.app.database.tracker.name).findOne({ token });
    }
}
