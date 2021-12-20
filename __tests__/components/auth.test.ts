import { Hasher } from '../../src/logic/auth/hasher';
class  TestHash extends Hasher {
    static generateToken =Hasher.generateToken
    static sign = Hasher.sign
}   


test("Authentication", () => {
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
    expect(TestHash.verifyToken(token)).toContain(expectedObject);

});
