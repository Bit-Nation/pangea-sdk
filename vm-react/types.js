class BaseType {

    constructor(props) {
        this.children = [];
        this.props = props;
    }

    setProps(props) {
        this.props = props
    }

    appendChild(child){
        this.children.push(child)
    }

    toJSON(){
        return {
            type: this.type,
            props: this.props,
            children: this.children.map((child) => child.toJSON())
        }
    }

}

export class View extends BaseType {

    static get type() {
        return "View"
    }

}

export class Text extends BaseType {

    static get type() {
        return "Text"
    }

}

export const types = {
    TextType,
    ViewType
};
