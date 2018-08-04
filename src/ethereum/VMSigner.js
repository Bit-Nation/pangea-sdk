import {sendETHTransaction} from '../vm'
const Wallet = require('./ethers').Wallet;
const BN = require('./ethers').utils.BigNumber;

/**
 * @desc Submit ethereum transaction to pangea and sign / abort there
 * @param provider
 * @param address
 * @constructor
 */
export default class VMSigner {

    constructor(provider, address){
        this.provider = provider;
        this.address = address;
    }

    sign() {
        throw new Error(`signing is currently not supported. Please use sentTransaction to sign and send a transaction.`)
    }

    signMessage(){
        throw new Error(`signing messages is currently not supported`)
    }

    encrypt(){
        throw new Error(`encrypting is not supported`);
    }

    getAddress(){
        return this.address
    }

    sendTransaction(transaction){
        return new Promise((res, rej) => {
            sendETHTransaction(transaction, (error, signedTransaction) => {

                if (error){
                    return rej(error)
                }

                const parsedTX = JSON.parse(signedTransaction);

                const tx = {
                    nonce: parsedTX.nonce,
                    gasPrice: new BN(parsedTX.gasPrice),
                    gasLimit: new BN(parsedTX.gasLimit),
                    to: parsedTX.to,
                    value: new BN(parsedTX.value),
                    data: parsedTX.data,
                    v: parsedTX.v,
                    r: parsedTX.r,
                    s: parsedTX.s,
                    chainId: parsedTX.chainId,
                    from: parsedTX.from,
                    hash: parsedTX.hash,
                    wait: () => {
                        return this.provider.waitForTransaction(parsedTX.hash);
                    }
                };

                res(tx)

            })
        })
    }

}
