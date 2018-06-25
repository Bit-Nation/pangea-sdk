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
     * @property {string} value (in WEI!)
     * @property {string} to (address)
     * @property {string} data
     *
     * @desc send an ethereum transaction
     * @param {TransactionParams} transactionParams
     * @param {function} callback will be called with the transaction (including TX hash). value, gasLimit, gasPrice must be base 10
     */
    sendETHTransaction: global.sendETHTransaction,
    /**
     * @desc get ethereum address of the current user (from pangea)
     */
    pangeaETHAddress: global.pangeaETHAddress,

    /**
     * @desc send a message via the chat
     * @desc {string}   type Type of this message e.g. "SEND_MONEY" (can be chosen by developer)
     * @desc {string}   group Group that the message relates to
     * @desc {object}   params A set of parameters
     * @desc {bool}     shouldSend Should this message be send to your chat partners
     * @desc {bool}     shouldRender Should this message be rendered
     * @desc {function} callback The callback will be called when the message has been send
     */
    sendMessage: global.sendMessage,
}
