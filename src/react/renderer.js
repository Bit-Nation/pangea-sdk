import React from 'react';
import Reconciler from 'react-reconciler';
import emptyObject from 'fbjs/lib/emptyObject';
import {registerFunction, newModalUIID} from '../vm-raw'
import BaseElement from '../ui/base'

const hostConfig = {

    appendInitialChild(parentInstance, child) {
        parentInstance.append(child)
    },

    createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
        return new BaseElement(type)
    },

    createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
        throw new Error("createTextInstance not implemented")
    },

    finalizeInitialChildren(element, type, props) {
        Object.keys(props).map((key) => {
            const propValue = props[key];

            // handle "special" children
            if (key === "children") {
                if (typeof propValue === 'number' || typeof propValue === 'string') {
                    element.children = propValue;
                }
                return
            }

            // handle function value
            if (typeof propValue === 'function') {
                const funcID = registerFunction(propValue);
                if (typeof funcID !== 'number'){
                    console.log(funcID);
                    throw new Error(`failed to register function - expected number (id)`)
                }
                element.props[key] = funcID
            }

            element.props[key] = props[key]
        });
        return element
    },

    // Useful only for testing
    getPublicInstance(inst) {
        throw new Error("getPublicInstance is not implemented")
    },

    prepareForCommit(containerInfo) {},
    resetAfterCommit() {},

    // Calculate the updatePayload
    prepareUpdate(domElement, type, oldProps, newProps) {
        throw new Error(`prepareUpdate not implemented`)
    },

    getRootHostContext(rootInstance) {
        return emptyObject
    },
    getChildHostContext(parentHostContext, type) {
        return emptyObject
    },

    shouldSetTextContent(type, props) {
        return (
            typeof props.children === 'string' ||
            typeof props.children === 'number'
        );
    },

    now: () => {
        // noop
    },

    useSyncScheduling: true,

    supportsMutation: true,

    mutation: {
        appendChild(parentInstance, child) {
            parentInstance.appendChild(child);
        },

        // appendChild to root container
        appendChildToContainer(parentInstance, child) {
            parentInstance.appendChild(child);
        },

        removeChild(parentInstance, child) {
            parentInstance.removeChild(child);
        },

        removeChildFromContainer(parentInstance, child) {
            parentInstance.removeChild(child);
        },

        insertBefore(parentInstance, child, beforeChild) {
            parentInstance.insertBefore(child, beforeChild);
        },

        insertInContainerBefore(parentInstance, child, beforeChild) {
            parentInstance.insertBefore(child, beforeChild);
        },

        commitUpdate(domElement, updatePayload, type, oldProps, newProps, internalInstanceHandle) {},

        commitMount(domElement, type, newProps, internalInstanceHandle) {},

        commitTextUpdate(textInstance, oldText, newText) {
            throw new Error("commitTextUpdate not implemented")
        },

        resetTextContent(domElement) {
            throw new Error("resetTextContent not implemented")
        },
    },
};

const PangeaRenderer = Reconciler(hostConfig);

export default {
    /**
     * @desc render a message
     * @param {object} element
     * @param {function} cb will be called with the rendered JSX as json
     */
    renderMessage: (element, cb) => {
        const container = element.props.container;
        if (!container){
            throw new Error(`no container present`)
        }
        const root = container._reactRootContainer = PangeaRenderer.createContainer(container);
        PangeaRenderer.updateContainer(element, root, null, () => {
            cb(container.toJSON())
        });
    },
    /**
     * @desc render a modal
     * @param {Modal} element
     * @param {function} cb
     * @return {*}
     */
    renderModal: (element, cb) => {
        const container = element.props.container;
        if (!container){
            throw new Error(`Missing container for modal`)
        }
        const root = container._reactRootContainer = PangeaRenderer.createContainer(container);
        return PangeaRenderer.updateContainer(element, root, null, cb);
    },
};
