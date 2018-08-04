const VMProvider = require('./VMProvider');
const vmRaw = require('../vm');

jest.mock('../vm', () => {
    return {
        ethereumRequest: jest.fn()
    }
});

describe('VMProvider', () => {

    test('send success', (done) => {

        const provider = new VMProvider();

        vmRaw.ethereumRequest = (data, cb) => {
            expect(data).toEqual("{\"method\":\"eth_getBalance\",\"params\":[\"0x407d73d8a49eeb85d32cf465507dd71d507100c1\",\"latest\"],\"jsonrpc\":\"2.0\"}")
            cb(null, JSON.stringify({
                "id":1,
                "jsonrpc": "2.0",
                "result": "0x0234c8a3397aab58" // 158972490234375000
            }))
        };

        provider
            .send("eth_getBalance", ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"])
            .then((data) => {

                expect(data).toEqual({
                    id: 1,
                    jsonrpc: "2.0",
                    result: "0x0234c8a3397aab58",
                });

                done();

            })
            .catch(done.fail)

    });

    test('send fail', (done) => {

        const provider = new VMProvider();

        vmRaw.ethereumRequest = (data, cb) => {
            cb("I am an error")
        };

        provider
            .send("eth_getBalance", ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"])
            .then((data) => {
                done.fail("should be rejected")
            })
            .catch((err) => {
                expect(err).toBe("I am an error");
                done();
            })

    })

});
