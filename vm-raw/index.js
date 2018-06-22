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
    ethereumRequest: global.ethereumRequest
}
