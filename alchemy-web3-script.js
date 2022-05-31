import { createAlchemyWeb3 } from "@alch/alchemy-web3";
if (window.ethereum) {
  ethereum
    .enable()
    .then((accounts) => {
      // Metamask is ready to go!
    })
    .catch((reason) => {
      // Handle error. Likely the user rejected the login.
    });
} else {
  // The user doesn't have Metamask installed.
}
const web3 = createAlchemyWeb3(
  "https://eth-rinkeby.alchemyapi.io/v2/",
);
const Alchemy = await web3.alchemy.getNfts({owner: "0x584A7892d3f7E7F98EE2458bC3FcaBabF0b8f9bc"});

console.log(Alchemy);