import React from 'react';
import Reconciler from 'react-reconciler';
import emptyObject from 'fbjs/lib/emptyObject';
import {registerFunction, renderModal as clientRenderModal} from '../vm'
import BaseElement from '../react/base'
import Container from "./container";

const hostConfig = {

    appendInitialChild(parentInstance, child) {
        parentInstance.append(child)
    },

    createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
        return new BaseElement(type);
    },

    createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
        return { isTextInstance: true, text };
    },

    finalizeInitialChildren(element, type, props) {
        Object.keys(props).map((key) => {
            const propValue = props[key];

            if (key === "children") {
                return;
            }

            // handle function value
            if (typeof propValue === 'function') {
                const funcID = registerFunction(propValue);
                if (typeof funcID !== 'number'){
                    throw new Error(`failed to register function - expected number (id)`)
                }
                element.props[key] = funcID;
                return;
            }

            element.props[key] = props[key];
        });
        return element;
    },

    // Useful only for testing
    getPublicInstance(inst) {
        throw new Error("getPublicInstance is not implemented")
    },

    prepareForCommit(containerInfo) {},
    resetAfterCommit() {},

    // Calculate the updatePayload
    prepareUpdate(domElement, type, oldProps, newProps) {
        return newProps
    },

    getRootHostContext(rootInstance) {
        return emptyObject
    },
    getChildHostContext(parentHostContext, type) {
        return emptyObject
    },

    shouldSetTextContent(type, props) {
        return false;
    },

    now: () => {
        // noop
    },

    useSyncScheduling: true,

    supportsMutation: true,

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

    commitUpdate(domElement, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
        // remove old props
        Object.keys(oldProps).map((key) => {
            if (typeof newProps[key] === "undefined"){
                delete domElement.props[key]
            }
        });

        // add new props
        Object.keys(newProps).map((key) => {
            if (key === "children") {
                return;
            }
            domElement.props[key] = newProps[key];
        })
    },

    commitMount(domElement, type, newProps, internalInstanceHandle) {},

    commitTextUpdate(textInstance, oldText, newText) {
        textInstance.text = newText;
    },

    resetTextContent(element) {
    },

};

const PangeaRenderer = Reconciler(hostConfig);

/**
 * @desc render a message
 * @param {object} element
 * @param {function} cb will be called with the strigified rendered JSX as json
 */
export const renderMessage = (element, cb) => {
    const container = new Container();
    const root = container._reactRootContainer = PangeaRenderer.createContainer(container);
    PangeaRenderer.updateContainer(element, root, null, () => {
        cb(JSON.stringify(container.toJson()))
    });
};

/**
 * @desc render a modal
 * @param {Modal} element
 * @param {function} cb
 * @return {*}
 */
export const renderModal = (element, cb) => {
    const container = element.props.modalContainer;
    if (!container){
        throw new Error(`Missing container for modal`)
    }
    container.props = {
        title: element.props.title,
    };
    const root = container._reactRootContainer = PangeaRenderer.createContainer(container);
    return PangeaRenderer.updateContainer(element, root, null, () => {
        clientRenderModal(container.uiID, JSON.stringify(container.toJson()), cb);
    });
};
