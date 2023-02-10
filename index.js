import * as anchor from "@project-serum/anchor";
import { Program, web3 } from "@project-serum/anchor";

async function main() {
  const user = web3.Keypair.generate();
  const provider = anchor.Provider(new anchor.web3.Connection(
    "https://api.devnet.solana.com",
    "confirmed"
), user);
  
  console.log(user)
  const message = `To avoid digital dognappers, sign below to authenticate with CryptoCorgis`;
  const encodedMessage = new TextEncoder().encode(message);
  const signedMessage = await provider.sig
  console.log(signedMessage)
}

main()