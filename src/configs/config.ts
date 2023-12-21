import { connect, disconnect } from 'starknetkit';
import { Contract,Provider,Account } from 'starknet'

import { abi } from '../assets/abi.json'
import { erc20abi } from '../assets/erc20abi.json'

const PRIVATE_KEY = "0x819033027885bc1840b6d564b6e8f68c"
const ACCOUNT_ADDRESS = "0x77a6390ab3dc3045df373b93bf8b93899c3ad5111da9b66c54b62ddc98e7d4"

const CONTRACT_ADDRESS = "0x10a09eb11dd5cc68012039a1923209413a96eafdefd635ac406231627464328"
//shall uncomment
const CONTRACT_ABI = abi
const ERC20_ABI = erc20abi

// const provider = new Provider({ rpc: { nodeUrl: "http://localhost:5050/rpc" } })
// const account = new Account(ACCOUNT_ADDRESS, PRIVATE_KEY);
// const contract = new Contract(abi, CONTRACT_ADDRESS, account);


async function connectWallet() {
    return await connect({ webWalletUrl: "https://web.argent.xyz" })
}

async function disconnectWallet() {
    await disconnect()
}

// export {contract,  account} //to add provider inside here
//line 27commented out should be uncommented
export { ACCOUNT_ADDRESS, CONTRACT_ADDRESS, disconnectWallet, CONTRACT_ABI, ERC20_ABI }
export default connectWallet 