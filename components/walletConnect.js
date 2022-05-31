import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";

const providerOptions = {
    binancechainwallet: {
      package: true
      },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: ""
      }
      },
      walletlink: {
      package: WalletLink, 
      options: {
        appName: "Net2Dev NFT Minter", 
        infuraId: "", 
        rpc: "", 
        chainId: 1, 
        appLogoUrl: null, 
        darkMode: true 
      }
      },
  };
  
  const web3Modal = new Web3Modal({
    network: "rinkeby",
    theme: "dark",
    cacheProvider: true,
    providerOptions 
  });

  async function connectwallet() { 
	  var provider = await web3Modal.connect();
      var web3 = new Web3(provider); 
      await window.ethereum.send('eth_requestAccounts'); 
      var accounts = await web3.eth.getAccounts(); 
      account = accounts[0]; 
      document.getElementById('wallet-address').textContent = account; 
      contract = new web3.eth.Contract(ABI, ADDRESS);
}