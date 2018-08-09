export default class Container {
    /**
     *
     * @param {string} uiID the location in pangea were this react will render
     */
    constructor(uiID){
        this.children = [];
        this.uiID = uiID;
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

    /**
     * @desc get jsx tree as json
     */
    toJson(){
        return {
            props: this.props,
            children: this.children.map((child) => child.toJson())
        }
    }

}
