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
        return new BaseElement('text');
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
        return newProps
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
            // If children is text, we should update it.
            if (key !== "children"){
                domElement.props[key] = newProps[key]
            } else if (typeof newProps.children === 'string' || typeof newProps.children === 'number') {
                domElement.children = newProps.children;
            }
        })
    },

    commitMount(domElement, type, newProps, internalInstanceHandle) {},

    commitTextUpdate(textInstance, oldText, newText) {
        textInstance = newText;
    },

    resetTextContent(element) {
        element.children = null;
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
