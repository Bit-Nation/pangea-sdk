import VM from '../../vm-raw'

class BaseElement {

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

        const children = this.children.map((child) => child.toJSON());

        const props = {};
        Object.keys(this.props).map((key) => {
            if (key !== 'children' || typeof this.props[key].children !== 'string'){
                const value = this.props[key];
                if (typeof value === 'function'){
                    props[key] = VM.registerFunction(value);
                    return
                }
                props[key] = this.props[key]
            }
        });

        return {
            type: this.type,
            props: props,
            children: children,
        }

    }

}
