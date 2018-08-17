import VM from '../vm'

export class Mutable {

    constructor(){
        this.children = [];
        this.props = {}
    }

    /**
     *
     * @param {object} child root child of this container
     */
    appendChild(child){
        this.children.push(child)
    }

    /**
     * @param child
     */
    removeChild(child){
        this.children = this.children.filter((c) => c !== child)
    }

    /**
     * @param child
     * @param beforeChild
     */
    insertBefore(child, beforeChild){
        this.children.map((currentChild, index) => {
            if(currentChild === beforeChild){
                this.children.splice(index, 0, child)
            }
        })
    }
}

export default class BaseElement extends Mutable {

    constructor(type) {
        super();
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

        let children = undefined;
        if (this.children.isTextInstance === true){
            children = this.children.text
        } else if (this.children !== null && this.children !== undefined) {
            children = this.children.map((child) => {
                if (child.isTextInstance === true){
                    return child.text
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
