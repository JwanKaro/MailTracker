import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

function generateEs512Keys() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('ec', {
        namedCurve: 'secp256k1',    // Options
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });
    return {
        publicKey: publicKey,
        privateKey: privateKey
    };
}

function main() {

    const buildFolder = path.join(process.cwd(), '/build');
    if (!fs.existsSync(buildFolder)) {
        fs.mkdirSync(buildFolder);
    }

    const secretsFolderPath = path.join(buildFolder, '/secrets');
    if (!fs.existsSync(secretsFolderPath)) {
        fs.mkdirSync(secretsFolderPath);
    }

    const keys = generateEs512Keys()

    fs.writeFileSync(path.join(secretsFolderPath, "/jwt-private.key"), keys.privateKey, {
        flag: 'w'
    });
    fs.writeFileSync(path.join(secretsFolderPath, "/jwt-public.key"), keys.publicKey, {
        flag: 'w'
    });
    fs.writeFileSync(path.join(buildFolder, "/settings.json"), JSON.stringify(
        {
            secrets: {
                paths: {
                    folder: secretsFolderPath,
                    jwtPrivateKey: `${secretsFolderPath}/jwt-private.key`,
                    jwtPublicKey: `${secretsFolderPath}/jwt-public.key`
                }
            }
        }
    ),
        {
            flag: 'w'
        }
    );

}

export default main;