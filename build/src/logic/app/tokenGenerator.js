"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenGenerator = void 0;
class tokenGenerator {
    constructor() {
        if (!process.app)
            throw new Error('No App instance');
    }
    /**
     * Generates token
     * @param userId
     * @param appId
     * @returns token
     */
    async generatetoken(userId, appId) {
        let token = await this.generateUniqueToken();
        await this.saveToken(token, userId, appId);
        return token;
    }
    async generateUniqueToken() {
        let token = this.uuidv4();
        let tokenExists = await this.checkTokenExists(token);
        if (tokenExists) {
            return this.generateUniqueToken();
        }
        else {
            return token;
        }
    }
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    async saveToken(token, userId, appId) {
        await process.app.SafeDB.realDB.collection(process.app.config.app.database.tracker.name).insertOne({
            token, userId, appId, createdAt: new Date(), hasSeen: false, details: {
                lastSeen: null,
                numOfTimesSeen: 0,
                timesSeen: []
            }
        });
    }
    async checkTokenExists(token) {
        return await process.app.SafeDB.realDB.collection(process.app.config.app.database.tracker.name).findOne({ token });
    }
}
exports.tokenGenerator = tokenGenerator;
