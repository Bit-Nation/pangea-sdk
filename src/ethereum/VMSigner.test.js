import VMSigner from './VMSigner'
import VM from '../vm-raw'
const VMProvider = require('./VMProvider');
const Wallet = require('./ethers').Wallet;
const InfuraProvider = require('./ethers').providers.InfuraProvider;
const ethersUtils = require('./ethers').utils

jest.mock('../vm-raw', () => {
    return {
        sendETHTransaction: jest.fn()
    }
});

describe('VMSigner', () => {

    test('default setup', () => {

        const provider = new VMProvider();
        const address = "0x00";

        const s = new VMSigner(provider, address);

        expect(s.provider).toBe(provider);
        expect(s.address).toBe(address);

        expect(() => {
            s.sign();
        }).toThrowError('signing is currently not supported. Please use sentTransaction to sign and send a transaction.');

        expect(() => {
            s.signMessage()
        }).toThrowError('signing messages is currently not supported');

        expect(() => {
            s.encrypt()
        }).toThrowError('encrypting is not supported');

        expect(s.getAddress()).toBe(address);

    });

    test('send transaction', (done) => {

        const privateKey = "0x25c7d2908f8c428b58a889557f04194c80dc323c80a4d84fb33e891e6846784d";

        const signWallet = new Wallet(privateKey);
        signWallet.provider = new InfuraProvider('rinkeby');

        // mock VM sendETHTransaction
        // with real world send transaction
        VM.sendETHTransaction = (data, cb) => {
            signWallet
                .sendTransaction(data)
                .then((tx) => {

                    tx.gasPrice = tx.gasPrice.toString(10);
                    tx.gasLimit = tx.gasLimit.toString(10);
                    tx.value = tx.value.toString(10);

                    cb(JSON.stringify(tx), null)

                })
                .catch((err) => cb(null, err))
        };

        const provider = new VMProvider();

        const s = new VMSigner(provider, signWallet.address);
        s
            .sendTransaction({
                to: "0x3d0a6c2d781ebe1d464c1d45829aacc2827e716d",
                value: ethersUtils.parseEther('0.0000000000000001')
            })
            .then((tx) => {

                expect(tx.gasPrice.toString(10)).toBe("1000000000");
                expect(tx.gasLimit.toString(10)).toBe("1500000");
                expect(tx.to).toBe('0x3d0a6C2D781EBe1D464C1d45829aACc2827e716D');
                expect(tx.value.toString(10)).toBe('100');
                expect(tx.data).toBe('0x');
                expect(tx.from).toBe(signWallet.address);
                expect(typeof tx.hash).toBe('string');
                expect(typeof tx.v).toBe('number');
                expect(typeof tx.r).toBe('string');
                expect(typeof tx.s).toBe('string');
                expect(typeof tx.wait).toBe('function');

                done()

            })
            .catch(done.fail)


    })

});
