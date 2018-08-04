const React = require('react');
const {renderModal} = require('../vm');

export class Message extends React.Component {}

export class ReactComponent extends React.Component {

    setState(data, cb){
        if (typeof cb !== "function"){
            throw new Error("you have to pass a callback to set state")
        }
        super.setState(data, () => {
            renderModal(this.uiID, this.container.toJSON(), cb)
        })
    }

}

export class Modal {
    /**
     *
     * @param props
     */
    constructor(props) {
        if (!props.container){
            throw new Error(`Modal needs a container`);
        }
        this.props = props
    }
}
