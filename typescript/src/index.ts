import { Relayer } from 'defender-relay-client';
import { Address, RelayerModel, RelayerParams } from 'defender-relay-client/lib/relayer';

const niceMinter: Address = '0x90552d25e322e0f3fa9ad44024fe4d66f9918cad';
// Entrypoint for the Autotask
export async function handler(credentials: RelayerParams) {
  
  const relayer = new Relayer(credentials);
  const info: RelayerModel = await relayer.getRelayer();
  console.log(`Relayer address is ${info.address}`);
  const txRes = await relayer.sendTransaction({
    to: niceMinter,
    data: '0x40c10f19000000000000000000000000826976d7c600d45fb8287ca1d7c76fc8eb7320300000000000000000000000000000000000000000000000000de0b6b3a7640000',
    gasLimit: '1000000',
  })
  console.log(`Transaction sent: ${txRes.hash}`);
}

// Sample typescript type definitions
type EnvInfo = {
  API_KEY: string;
  API_SECRET: string;
}

// To run locally (this code will not be executed in Autotasks)
if (require.main === module) {
  require('dotenv').config();
  const { API_KEY: apiKey, API_SECRET: apiSecret } = process.env as EnvInfo;
  handler({ apiKey, apiSecret })
    .then(() => process.exit(0))
    .catch((error: Error) => { console.error(error); process.exit(1); });
}
