import { Hasher } from '../../src/logic/auth/hasher';
import { Client } from '../../src/logic/auth/client';
class TestHash extends Hasher {
    static generateToken = Hasher.generateToken
    static sign = Hasher.sign
}



describe("Client", () => {
    const params = {
        id: TestHash.uuidv4(),
        secret: TestHash.uuidv4(),
    }

    test("create:success", async () => {
        const token = await Client.create(params.id, params.secret)
        expect(token).toBeDefined()
        expect(token.success).toBeTruthy()
        expect(token.message).toBe("Client created")
    })

    test("create:fail", async () => {
        const token = await Client.create(params.id, params.secret)
        expect(token).toBeDefined()
        expect(token.success).toBeFalsy()
        expect(token.message).toBe("Client already exists")
    })


    console.log(params);
    
})



test("JWT", () => {
    const expectedObject = {
        id: 1,
        name: 'test',
        email: '',
        password: '',
        role: '',
        createdAt: '',
        updatedAt: '',
    }
    const token = TestHash.generateToken(expectedObject)
    expect(token).toBeDefined();
    const restoredObject = TestHash.verifyToken(token);
    if (restoredObject)
        expect(restoredObject.data).toEqual(expectedObject);

});
