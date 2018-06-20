import {types} from "./types";
import emptyObject from 'fbjs/lib/emptyObject';

export default hostConfig = {

    appendInitialChild(parentInstance, child) {
        parentInstance.appendChild(child);
    },

    createInstance(type, props) {

        const toInit = types[type];

        if (!toInit){
            throw new Error(`couldn't init: ${type}`)
        }

        return new toInit(props)

    },

    createTextInstance(text) {
        throw new Error("createTextInstance not implemented")
    },

    finalizeInitialChildren() {
        return false;
    },

    getPublicInstance(inst) {
        return inst;
    },

    prepareForCommit() {},

    resetAfterCommit() {},

    // Calculate the updatePayload
    prepareUpdate(domElement, type, oldProps, newProps) {
        return newProps
    },

    getRootHostContext() {
        return emptyObject;
    },
    getChildHostContext() {
        return emptyObject;
    },

    // @todo probably for button as well
    shouldSetTextContent(type, props) {
        return (
            type === 'Text'
        )
    },

    now: () => {
        // noop
    },

    appendChildToContainer(parentInstance, child) {
        parentInstance.appendChild(child);
    },

    useSyncScheduling: true,

    supportsMutation: true,

};
