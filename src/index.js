import vm from './vm'
import {renderMessage, renderModal} from './react/renderer'
import {ModalComponent, Modal} from './react/dAppComponent'
import Container from './react/container'

const Pangea = {
    ethereumAddress: vm.ethereumAddress,
    setMessageHandler: vm.setMessageHandler,
    renderMessage: renderMessage,
    renderModal: renderModal,
    sendETHTransaction: vm.sendETHTransaction,
    sendMessage: vm.sendMessage,
    setOpenHandler: vm.setOpenHandler,
    setMessageRenderer: vm.setMessageRenderer,
    randomBytes: vm.randomBytes,
    newModalUIID: vm.newModalUIID,
    db: vm.db,
    Modal: Modal,
    ModalComponent: ModalComponent,
    Container: Container
};

export default Pangea
