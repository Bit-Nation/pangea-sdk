import {ethereumRequest} from '../vm'

const JsonRpcProvider = require('./ethers').providers.JsonRpcProvider;
const defineProperty = require('./ethers').utils.defineProperty;

/**
 * @desc The VM provider provides an compatible ether.js provider. Calls are passed to the VM and processed there.
 * @constructor
 */
function VMProvider() {
    if (!(this instanceof VMProvider)){
        throw new Error(`missing new`);
    }
}
JsonRpcProvider.inherits(VMProvider);

defineProperty(VMProvider.prototype, 'send', function(method, params) {

    const payload = JSON.stringify({
        method: method,
        params: params,
        jsonrpc: "2.0"
    });

    return new Promise((resolve, reject) => {

        // send request to ethereum
        ethereumRequest(payload, (error, response) => {
            // reject on error
            if (error){
                return reject(error)
            }

            // parse response and reject if fails
            let parsedResponse = {};
            try {
                parsedResponse = JSON.parse(response)
            } catch (err){
                return reject(err)
            }

            return resolve(parsedResponse)

        })

    });
});

module.exports = VMProvider;
