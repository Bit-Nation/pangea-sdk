import VM from '../vm-raw'

export default class BaseElement {

    constructor(props, children) {
        this.props = props;
        this.children = children;
    }

    toJSON(){

        const children = this.children.map((child) => {
            if(typeof child === 'string') {
                return child
            }
            return child.toJSON()
        });

        Object.keys(this.props).map((key) => {
            if (typeof this.props[key] === 'function'){
                this.props[key] = VM.registerFunction(this.props[key])
            }
        });

        return {
            type: this.type,
            props: this.props,
            children: children,
        }

    }

}
