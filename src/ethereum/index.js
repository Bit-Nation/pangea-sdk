const Uint8Array = require('typedarray').Uint8Array;

import {pangeaETHAddress} from '../vm-raw'
const VMProvider = require('./vmProvider');
const VMSigner = require('./VMSigner');

const provider = new VMProvider();

export default new VMSigner(provider, pangeaETHAddress());
