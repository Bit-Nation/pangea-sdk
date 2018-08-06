const Uint8Array = require('typedarray').Uint8Array;
import {ethereumAddress} from '../vm'

const VMProvider = require('./vmProvider');
const VMSigner = require('./VMSigner');

const provider = new VMProvider();

export default new VMSigner(provider, ethereumAddress);
