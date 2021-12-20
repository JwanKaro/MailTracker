import { Hasher } from './hasher';
export class Client {
    public static async validate(clientId: string, clientSecret: string) {
        const client = await this.get(clientId)
        return client ? Hasher.comparePwdRaw(client.secret, clientSecret) : false;
    }


    public static async exists(clientId: string) {
        const client = await this.get(clientId)
        return client ? true : false;
    }

    public static async get(clientId: string) {
        const client = await process.app.SafeDB.realDB.collection('clients').findOne({ id: clientId })
        return client || false;
    }

    private static async save(id: any, hashedSecret: string) {
        const results = await process.app.SafeDB.realDB.collection('clients').insertOne({ id: id, secret: hashedSecret })
        return results.acknowledged ? true : false;
    }

    public static async create(clientId: string, clientSecret: string) {
        if (await this.exists(clientId)) return { success: false, message: 'Client already exists' };
        
        const hashedSecret = await Hasher.hashPassowordBcrypt(clientSecret)
        const result = await this.save(clientId, hashedSecret)
        return { success: result, message: result ? 'Client created' : 'Failed to create client' };
    }

    /**
     * Determines whether is authorized to create a client
     * 
     * !TODO: there must be a better way to do this  
     * @param apiKey 
     */
    static isAuthorized(apiKey: string) {
        if (process.env.CREATE_CLIENT_KEY)
            return Hasher.comparePwd(process.env.CREATE_CLIENT_KEY, apiKey) ? true : false;

    }

}