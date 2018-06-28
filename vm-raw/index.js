export default {
    /**
     * @desc add a function to the VM a unique reference will be returned
     * @param {function} the callback that should be registered
     * @returns {int|Error} an error or unique id
     */
    registerFunction: global.registerFunction,
    /**
     * @desc sends an json rpc request to the ethereum network
     * @param {Object} requestObject json rpc request
     * @param {callback} callback can be called with error or json rpc response (string)
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
     * @param {function} callback - will be called with error or transaction
     */
    sendETHTransaction: global.sendETHTransaction,
    /**
     * @desc send a message via the chat
     * @param {string}   type Type of this message e.g. "SEND_MONEY" (can be chosen by developer)
     * @param {string}   group Group that the message relates to
     * @param {object}   params A set of parameters
     * @param {bool}     shouldSend Should this message be send to your chat partners
     * @param {bool}     shouldRender Should this message be rendered
     * @param {function} callback The callback will be called when the message has been send
     */
    sendMessage: global.sendMessage,
    /**
     * @desc set open handler
     * @param {function} handler - will be called with payload and callback. The callback must be called (with an optional error)
     */
    setOpenHandler: global.setOpenHandler,
    /**
     * @desc show modal
     * @param {string} title Title to display on modal
     * @param {string} layout Layout of the modal body
     * @param {function} will be called when the modal is about to render
     */
    showModal: global.showModal,
    /**
     * @desc handle a message and render it's layout
     * @param {object} payload with message and context
     * @param {function} callback - should be called with error and layout
     */
    setMessageHandler: global.setMessageHandler,
    /**
     * @desc ethereum address of this pangea user
     */
    ethereumAddress: global.ethereumAddress,
    /**
     * @desc Generates random bytes
     * @param {number} amount the amount of random bytes that should be generated
     * @param {function} callback - will be called with error and bytes
     */
    randomBytes: global.randomBytes,
}
