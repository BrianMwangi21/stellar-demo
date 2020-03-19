import StellarSdk from 'stellar-sdk';

// Creates SHILINGI asset issued by account from secret
const source = StellarSdk.Keypair.fromSecret('SAP467V4Q5MQGTDKOLJS2EBPDMIQECUNI632N2VTOBPZ2V76K4D2TCG7');
var shilingiAsset = new StellarSdk.Asset('KES4042', source.publicKey());

export default shilingiAsset;