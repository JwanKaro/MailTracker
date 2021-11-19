
export class tokenGenerator {
    constructor() {
        if (!process.app) throw new Error('No App instance');
    }
    /**
     * Generates token
     * @param userId 
     * @param appId 
     * @returns token 
     */
    public async generatetoken(userId: string, appId: string): Promise<string> {
        let token = await this.generateUniqueToken();
        await this.saveToken(token, userId, appId);
        return token;
    }



    private async generateUniqueToken(): Promise<string> {
        let token = this.uuidv4();
        let tokenExists = await this.checkTokenExists(token);
        if (tokenExists) {
            return this.generateUniqueToken();
        } else {
            return token;
        }
    }

    private uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }



    private async saveToken(token: string, userId: string, appId: string) {

        await process.app.SafeDB.realDB.collection(process.app.config.app.database.tracker.name).insertOne({
            token, userId, appId, createdAt: new Date(), hasSeen: false, details: {
                lastSeen: null,
                numOfTimesSeen: 0,
                timesSeen: [
                ]
            }
        });
    }
    private async checkTokenExists( token: string) {
        return await process.app.SafeDB.realDB.collection(process.app.config.app.database.tracker.name).findOne({ token });
    }




}
