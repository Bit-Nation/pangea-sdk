import {render, UIElements} from "./ui"
import vm from './vm-raw'
import ethereum from './ethereum'

const Pangea = {
    renderUI: render,
    sendMessage: vm.sendMessage,
    ethereumAddress: vm.ethereumAddress,
    setOpenHandler: vm.setOpenHandler,
    showModal: vm.showModal,
    setMessageHandler: vm.setMessageHandler,
    etherjs: ethereum,
};

export default Object.assign(UIElements, Pangea);
