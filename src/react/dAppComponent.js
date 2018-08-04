const React = require('react');
const {renderModal} = requrie('../vm-raw');

export class Message extends React.Component {
    /**
     *
     * @param props
     */
    constructor(props) {
        super();
        if (!props.container){
            throw new Error(`Message needs a container`);
        }
        this.props = props
    }
}

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
