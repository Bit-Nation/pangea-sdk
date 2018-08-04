export default class Container {
    /**
     *
     * @param {string} uiID the location in pangea were this react will render
     */
    constructor(uiID){
        this.child = null;
        this.uiID = uiID;
    }

    /**
     *
     * @param {object} child root child of this container
     */
    appendChild(child){
        if (this.child){
            throw new Error(`Already set child. Root container can only have one child.`)
        }
        this.child = child;
    }

    /**
     * @desc update pangea UI
     */
    toJSON(){
        return this.child.toJSON()
    }

}
