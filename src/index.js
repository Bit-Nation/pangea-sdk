import vm from './vm'
import ethereum from './ethereum'
import {renderMessage, renderModal} from './react/renderer'

const Pangea = {
    ethereumAddress: vm.ethereumAddress,
    setMessageHandler: vm.setMessageHandler,
    etherjs: ethereum,
    renderMessage: renderMessage,
    renderModal: renderModal,
    sendETHTransaction: vm.sendETHTransaction,
    sendMessage: vm.sendMessage,
    setOpenHandler: vm.setOpenHandler,
    setMessageRenderer: vm.setMessageRenderer,
    randomBytes: vm.randomBytes,
    newModalUIID: vm.newModalUIID,
    db: vm.db
};

export default Pangea
