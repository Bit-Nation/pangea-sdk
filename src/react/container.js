import {Mutable} from "./base";

export default class Container extends Mutable {
    /**
     *
     * @param {string} uiID the location in pangea were this react will render
     */
    constructor(uiID){
        super();
        this.uiID = uiID;
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
