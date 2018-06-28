import {render, UIElements} from "./ui"
import vm from './vm-raw'

const Pangea = {
    renderUI: render,
    sendMessage: vm.sendMessage,
    ethereumAddress: vm.ethereumAddress,
    setOpenHandler: vm.setOpenHandler,
    showModal: vm.showModal,
    setMessageHandler: vm.setMessageHandler
};

export default Object.assign(UIElements, Pangea);
