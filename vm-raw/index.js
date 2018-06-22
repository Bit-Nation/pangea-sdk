export default {
    /**
     * @desc add a function to the VM a unique reference will be returned
     */
    registerFunction: global.vmRegisterFunction,
    /**
     * @desc sends an json rpc request to the ethereum network
     * @param requestObject
     * @param callback
     */
    ethereumRequest: global.ethereumRequest,
    /**
     * @typedef {Object} TransactionParams
     * @property {string} purpose
     * @property {string} amount (in WEI!)
     * @property {string} to (address)
     * @property {string} data
     *
     * @desc send an ethereum transaction
     * @param {TransactionParams} transactionParams
     * @param {function} callback will be called with transaction hash and error (null if no error)
     */
    sendETHTransaction: global.sendETHTransaction
}
