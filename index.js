import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { AuthorityScope } from '@metaplex-foundation/mpl-auction-house';
import { Metaplex, keypairIdentity, token } from "@metaplex-foundation/js";
import { initializeKeypair } from "./utils.js";

async function main() {
  const connection = new Connection(
    clusterApiUrl('devnet'),
    'confirmed',
  );
  const keyPair = await initializeKeypair(connection);
  const metaplex = Metaplex.make(connection).use(keypairIdentity(keyPair));

  // const feeAccount = Keypair.fromSecretKey(Uint8Array.from([
  //     158, 107, 121,   4,  21, 109, 119, 161, 201, 206, 120,
  //      49, 186, 208, 166, 231,  45,   0, 234, 183, 157, 248,
  //       3,  18, 247, 239, 135, 154,  31, 202, 194,   5, 169,
  //     195, 138,  47, 206, 130,   7, 133, 157, 150, 212, 130,
  //     173,  98, 141,  89, 139, 198, 132,  11,  50, 185, 154,
  //      42, 234,   3, 158,  82, 167, 225,  55,   4
  //   ]));
  // const treasuryAccount = Keypair.fromSecretKey(Uint8Array.from([
  //     185, 181,  42,  61, 157, 200,  67,  75, 148, 109, 144,
  //     164, 250,   9, 164, 246, 255, 174, 194, 119, 228,  30,
  //     113, 231, 253, 240,  45, 214,  68,  51, 227, 151, 103,
  //      37,  10,  19,  42,  90,  78,  77, 217,  54, 102,  80,
  //      37,  84, 171, 144, 235,  42, 212,  91, 120, 110, 200,
  //     249,  64, 184,  44, 153,   0, 206,  71, 220
  //   ]));
  // const feeWithdrawalDestination = Keypair.fromSecretKey(Uint8Array.from([
  //     199, 139,  82, 229, 157, 153, 92,  34,  90,   0, 226, 213,
  //     123, 254, 179,  36, 218,  52,  4,  82, 114,  14,   8, 139,
  //       7,  41, 209, 135, 102,   5, 93, 214,  36,  73,  16, 105,
  //      64, 243,  29,  32, 208, 184, 58, 211, 212, 228,  30,  98,
  //      32, 153, 105, 232, 234,  10, 12,  76, 158,  80,  57,  53,
  //      76, 228,  47,   5
  //   ]));
  // const treasuryWithdrawalDestination = Keypair.fromSecretKey(Uint8Array.from( [
  //     180, 225, 114, 254, 189, 253, 124,  15,  35,  93, 129,
  //     157,  73, 121,  92, 148,   3, 108, 103,  36, 238, 156,
  //     157,  16, 184, 249, 237, 222,  96, 181,   8,  50, 194,
  //      86, 201, 212, 206, 120,  37,  52, 249, 152,  57, 175,
  //     149, 239, 151, 181,   1, 173, 225, 226, 224,  46, 108,
  //     120, 177,  19, 227, 103, 104,  74, 116, 224
  //   ]));

  const newAuthority = Keypair.fromSecretKey(Uint8Array.from([
    216, 154, 83, 46, 189, 193, 34, 164, 41, 78, 108,
    112, 8, 134, 29, 4, 66, 11, 109, 193, 68, 86,
    81, 3, 50, 45, 175, 22, 197, 53, 92, 103, 245,
    198, 125, 185, 155, 214, 49, 89, 245, 137, 20, 194,
    99, 103, 155, 239, 138, 108, 231, 125, 59, 71, 201,
    106, 77, 108, 190, 35, 122, 121, 76, 168
  ]));


  // await connection.requestAirdrop(
  //     newAuthority.publicKey,
  //     2*LAMPORTS_PER_SOL,
  // );

  console.log(newAuthority.publicKey)

  // const myCustomToken = new PublicKey("ivczN7teG34QRdh56UoYmj6KkG73S8fWtns2Csn3n9A");
  // console.log("my custom account ", myCustomToken.toBase58());

  // const tokenAccount = await getOrCreateAssociatedTokenAccount(
  //     connection,
  //     feeAccount,
  //     myCustomToken,
  //     feeAccount.publicKey
  // )

  // console.log(tokenAccount.address.toBase58());
  // 7UX2i7SucgLMQcfZ75s3VXmZZY4YRUyJN9X1RgfMoDUi
  const auctionHouse = await metaplex
    .auctionHouse()
    .findByAddress({
      address: new PublicKey("2BL3rwpTWWdsjDUWFvvGM4jrGq9GTWPUVWuat9FDBUUD"),
      auctioneerAuthority: new PublicKey("HYQS5vdpxVzKpbZ7PmKoETeTsUnbZCA7HpedDR5wBzvs")
    });
  console.log(auctionHouse.address)
  const seller = Keypair.fromSecretKey(Uint8Array.from([80, 163, 82, 48, 72, 33, 158, 92, 43, 57, 6, 101, 42, 109, 169, 118, 51, 132, 139, 4, 110, 43, 8, 86, 198, 196, 197, 235, 119, 247, 63, 242, 127, 20, 121, 171, 103, 196, 197, 222, 160, 244, 21, 185, 211, 255, 67, 215, 215, 14, 238, 22, 216, 167, 137, 2, 123, 74, 136, 34, 13, 161, 73, 73]));
  console.log(seller)
  const inpListing = {
    auctionHouse: auctionHouse,                              // A model of the Auction House related to this listing
    seller: seller,
    auctioneerAuthority: newAuthority,
    mintAccount: Keypair.generate().publicKey,
    authority: Keypair.fromSecretKey(Uint8Array.from([216, 154, 83, 46, 189, 193, 34, 164, 41, 78, 108,
      112, 8, 134, 29, 4, 66, 11, 109, 193, 68, 86,
      81, 3, 50, 45, 175, 22, 197, 53, 92, 103, 245,
      198, 125, 185, 155, 214, 49, 89, 245, 137, 20, 194,
      99, 103, 155, 239, 138, 108, 231, 125, 59, 71, 201,
      106, 77, 108, 190, 35, 122, 121, 76, 168])),             // The Auction House authority
    tokenAccount: new PublicKey("6nvpQq63qtZX5fyQw1ot7HAjJThEaezjTkosDuah4Nnn"), // The token account address that's associated to the asset a listing created is for 
    price: token(5),                                  // The listing price
    tokens: token(1),                                  // The number of tokens to list, for an NFT listing it must be 1 token
  }
  await metaplex
    .auctionHouse()
    .list(inpListing);
}

main()

