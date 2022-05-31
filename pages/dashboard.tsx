import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import Header from '../components/Header'
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import {
  marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
import Footer from '../components/Footer'

export default function CreatorDashboard() {
  const web3 = createAlchemyWeb3(
    "https://eth-rinkeby.alchemyapi.io/v2/",
  );
  const [nfts, setNfts] = useState([])
  const [NFTs, setNFTs] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => 
  loadNFTs(), []
  )
    
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
    })
    
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    const data = await contract.fetchItemsListed()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller, 
        owner: i.owner,
        image: meta.data.image,
      }
      
      return item
    }))
    const account = await web3.eth.getAccounts();
    const NFTs = await web3.alchemy.getNfts({owner:account[0]});
    setNFTs(NFTs.ownedNfts)
    setNfts(items)
    console.log(items)
    setLoadingState('loaded')
    
  }

    return (
    <div className="bg-neutral-800 scrollbar-hide flex h-screen flex-col justify-between overflow-y-scroll">
    <Header />
    
    <main className="grid" >
    <div className="grid justify-center">      

    <section className="">
        <h2 className="text-2xl py-2">Items Listed</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 pt-2 mx-auto">
          {
            nfts.map((nft, i) => (
              <div className="w-36 h-48 mb-4">
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} className="rounded h-36 w-36" />
                <div className="h-10 bg-black flex truncate items-center">
                <img
                        className="h-6 w-8 ml-2"
                        src="https://ipfs.io/ipfs/QmTZYr66QaCrxkFn5r1UeLm74yRxtUPxZJE91HptvsKben"
                        alt="" />
                  <p className="text-lg font-bold text-white w-48">{nft.price}</p>
                </div>
              </div>
              </div>
            ))
          }
          </div>
        <section className='mt-10 col-span-2'><h2 className="text-2xl py-2">Items on my Wallet</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 pt-2">
        {
            NFTs.map((NFT, i) => (
              <div className="w-36 h-48 mb-4">
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={NFT.metadata.image} className="rounded h-36 w-36" />
                <div className="p-4 bg-black">
                  <p className="text-lg font-bold text-white">Sell NFT</p>
                </div>
              </div>
              </div>
            ))
          }
          </div>
        </section>
        </section>
        </div>
      
      </main>
      <footer className="sticky bottom-0 w-full items-center p-8">
        <Footer />
      </footer>
    </div>
  )
}