import VM from '../vm'

export default class BaseElement {

    constructor(type) {
        if (typeof type !== "string"){
            throw new Error(`type must be a string`)
        }
        this.type = type;
        this.props = {};
        this.children = [];
    }

    append(child){
        this.children.push(child)
    }

    toJson(){

        let children;
        if (typeof this.children === 'string' || typeof this.children === 'number'){
            children = this.children
        } else {
            children = this.children.map((child) => {
                if(typeof child === 'string' || typeof child === 'number') {
                    return child
                }
                return child.toJson()
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
            children: children,
        }

    }

}
