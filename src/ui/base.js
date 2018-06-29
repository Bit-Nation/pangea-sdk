import VM from '../vm-raw'

export default class BaseElement {

    constructor(props, children) {
        this.props = props;
        this.children = children;
    }

    toJSON(){

        if (typeof this.children === "string") {
            this.children = this.children.map((child) => {
                if(typeof child === 'string') {
                    return child
                }
                return child.toJSON()
            });
        }

        Object.keys(this.props).map((key) => {
            if (typeof this.props[key] === 'function'){
                const funcID = VM.registerFunction(this.props[key]);
                if (typeof funcID !== 'number') {
                    throw new Error(`Expected function id to be a number but got this: `+funcID);
                }
                this.props[key] = funcID;
            }
        });

        return {
            type: this.type,
            props: this.props,
            children: this.children,
        }

    }

}
