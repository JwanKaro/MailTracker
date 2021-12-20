import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';



export  class Hasher {

    protected static sign(payload: any, secret: string) {
        return jwt.sign(payload, secret, { algorithm: 'ES512' });
    }

    public static verify(token: string, secret: string) {
        const d = jwt.verify(token, secret, { algorithms: ['ES512'] });
        if (typeof d == 'string')
            throw new Error(d);
        if (d.exp && d.exp < Date.now() / 1000)
            throw new Error('token expired');
        if (d.data == undefined)
            throw new Error('invalid token');
        return d;
    }


    protected static generateToken(data: any) {
        if (process.env.JWT_SECRET_PRIVATE == undefined) throw new Error('private key not defined');
        return this.sign({
            data: data,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
        }, process.env.JWT_SECRET_PRIVATE);
    }

    public static verifyToken(token: string) {
        if (process.env.JWT_SECRET_PUBLIC == undefined) throw new Error('jsonwebtoken public key not defined');
        try {
            const obj = Hasher.verify(token, process.env.JWT_SECRET_PUBLIC);
            return obj;
        } catch (error) {
            return false;
        }
    }

    public static comparePwd = (pwd1: string, pwd2: string) =>
        this.comparePasswordBcrypt(this.hashPassowordBcrypt(pwd1), this.hashPassowordBcrypt(pwd2))
    public static comparePwdRaw = (pwd: string, hashedPwd: string) =>
        this.comparePasswordBcrypt(this.hashPassowordBcrypt(pwd), hashedPwd)
    public static hashPassowordBcrypt(password: string) {
        return bcrypt.hashSync(password, 10);
    }
    public static comparePasswordBcrypt(password: string, hash: string) {
        return bcrypt.compareSync(password, hash);
    }

    static uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
