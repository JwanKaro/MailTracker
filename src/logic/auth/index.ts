import { Hasher } from './hasher';
import bcrypt from 'bcrypt';
import express from 'express';
import { Client } from './client';


export class Authentication extends Hasher {



    static login(req: express.Request, res: express.Response) {
        const clientId = req.body.id, clientSecret = req.body.secret;

        process.app.SafeDB.realDB.collection('clients').findOne({ id: clientId }, (err, client) => {

            if (err) return res.status(500).send('internal server error');
            if (!client) return res.status(401).send('unauthorized');

            if (!this.comparePasswordBcrypt(clientSecret, client.secret)) return res.status(401).send('unauthorized');

            res.send({
                token: this.generateToken(clientId)
            });
        });
    }
    static async createClient(req: express.Request, res: express.Response) {
        // validate request
        if (process.env.CLIENT_PWD == undefined) throw new Error('client password not defined');
        if (req.body.trustedAuthority == undefined) return res.status(400).send('bad request');
        

        if (Client.isAuthorized(req.body.trustedAuthorityToken)) return res.status(401).send('unauthorized');
        
        const clientId = req.body.id, clientSecret = req.body.secret;
        if (clientId == undefined || clientSecret == undefined) return res.status(400).send('bad request');
        if (clientId.length < 3 || clientSecret.length < 3) return res.status(400).send('bad request');

        if (await Client.exists(clientId)) return res.status(400).send('Client already exists');
        
        const saved = await Client.create(clientId, clientSecret);
        
        if (!saved) return res.status(500).send('internal server error');
        
        res.send({
            token: this.generateToken(clientId)
        });
    }



    public static verifyRequest(req: express.Request, res: express.Response, next: express.NextFunction) {

        if (!req.headers.authorization) return res.status(401).send('Unauthorized');

        const token = req.headers.authorization.split(' ')[1];

        if (!token) return res.status(401).send('Unauthorized');
        const obj = this.verifyToken(token);
        if (!obj) return res.status(401).send('Unauthorized');

        req.token = obj.data;
        req.isAuthenticated = true;

        next();

    }






}
