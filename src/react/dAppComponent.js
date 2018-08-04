const React = require('react');
const {renderModal} = require('../vm');

export class Message extends React.Component {}

export class ModalComponent extends React.Component {
    setState(data, cb){
        const modalContainer = this.props.modalContainer;
        if (!modalContainer){
            throw new Error(`the component must have a modalContainer`)
        }
        if (typeof modalContainer.uiID !== "string") {
            throw new Error(`expected uiID of container to be a string`)
        }
        if (typeof cb !== "function"){
            throw new Error("you have to pass a callback to set state")
        }
        super.setState(data, () => {
            renderModal(modalContainer.uiID, modalContainer.toJson(), cb)
        })
    }
}

export class Modal extends ModalComponent{
    /**
     *
     * @param props
     */
    constructor(props) {
        super();
        if (!props.modalContainer){
            throw new Error(`Modal needs an container`);
        }
        this.props = props
    }
}
