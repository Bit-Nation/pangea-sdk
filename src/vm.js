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
     * @typedef {object} MessagePayload
     * @property {boolean} should send - a flag that indicates if the message should be send to your chat partner or not
     * @property {object} params - a set of parameters
     * @property {string} type (e.g. SEND_MONEY)
     *
     * @desc send a message
     * @param {string} chat the chat
     * @param {MessagePayload} payload
     * @param {function} callback will be called with an error
     */
    sendMessage: global.sendMessage,
    /**
     * @desc set open handler
     * @param {function} handler - will be called with payload and callback. The callback must be called (with an optional error)
     */
    setOpenHandler: global.setOpenHandler,
    /**
     * @desc set a message renderer
     * @param {object} payload with message and context
     * @param {function} callback - should be called with error and layout
     */
    setMessageRenderer: global.setMessageRenderer,
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
    /**
     * @desc Generates a new modal User Interface ID
     * @param {function} closer - the closer will be called when the modal is closed
     * @param {function} callback - the callback will be called with and error and an ui id
     */
    newModalUIID: global.newModalUIID,
    /**
     * @desc Render a modal
     * @param {string} uiID - the UI id of the modal
     * @param {string} layout - the JSX Json layout
     * @param {function} callback - will ba called with an error after the modal got rendered
     */
    renderModal: global.renderModal,
    /**
     * @desc Database (key => value storage)
     */
    db: {
        /**
         * @desc put value into database
         * @param {string} key
         * @param {*} value
         * @param {function} callback will be called with an error
         */
        put: global.dbPut,
        /**
         * @desc check if a value for the given key exist
         * @param {string} key
         * @param {function} callback will be called with an error an a boolean
         */
        has: global.dbHas,
        /**
         * @desc get value from database
         * @param {string} key
         * @param {function} callback will be called with an error and the fetched value
         */
        get: global.dbGet,
        /**
         * @desc delete value from key value storage
         * @param {string} key
         * @param {function} callback will be called with an error
         */
        delete: global.dbDelete
    }
}
