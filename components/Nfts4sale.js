import React from 'react';
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import Web3Modal from 'web3modal'
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  DotsVerticalIcon,
  ChatIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled, BookmarkIcon as BookmarkIconFilled } from "@heroicons/react/solid";
import {
  marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

function Posts(props) {

  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider("YOURPROVIDER")
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, provider)
    const data = await contract.fetchMarketItems()

    /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
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
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded')
  }
  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
  }
  if (loadingState === 'loaded' && !nfts.length)
    return (
      <div>


      </div>
    )

  return (
    <div>
      {
        nfts.map((nft, i) => (
          <div key={i} className="overflow-hidden">

            <div className="border-dashed mt-5 boder-dashed border-2 border-b-0 rounded-t-xl border-gray-400">
            <div className="drop-shadow-lg mt-1"><p style={{ height: '42px' }} className="text-center text-white text-2xl font-semibold">{nft.name}</p></div>
              <img src={nft.image} className="object-cover rounded-xl w-full" />
            </div>
            <div className=" border-dashed mb-16 border-t-0 rounded-b-xl border-gray-400 border-2 overflow:hiden">

              <div className="object-fill">
                <div className="flex">

                  <div className="bg-gray-300 rounded-lg p-2 mt-2 mb-2 ml-2 mr-1">
                    <div className="flex items-center justify-center max-w-[200px]">
                      <div className=" max-w-[100px]">
                        <img
                          className="rounded-full"
                          src={nft.image}
                          alt="" />
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <p className="text-center text-gray-700 w-36 truncate text-lg">{nft.owner}</p>
                    </div >
                  </div>


                  <div className="grow w-12 mt-1">
                    <div className="h-14 flex items-center bg-lime-500 truncate m-3 rounded-md object-fill">
                    <div className="popOut flex items-center">
                      <img
                        className="h-10 w-14 ml-2"
                        src="https://ipfs.io/ipfs/QmTZYr66QaCrxkFn5r1UeLm74yRxtUPxZJE91HptvsKben"
                        alt="" />
                      <h3 className="grow w-12 ml-1 text-2xl font-bold text-left text-gray-700">{nft.price}</h3>
                      
                    </div>
                    </div>
                    <div
                      className="bg-yellow-300 h-14 flex items-center m-3 rounded-md truncate">
                      <div className="">
                      <HeartIconFilled className="text-red-500 border-black btn flex ml-3" />
                      </div>
                      <h3 className="ml-1 text-2xl font-bold text-left text-gray-700">1200000</h3>
                    </div>
                  </div>

                  <div className="object-right mt-1">
                    <div className="w-36">
                      <div className="bg-red-500 h-14 flex justify-center items-center mt-3 mb-3 mr-3 rounded-md">
                        <button
                          className="btn"
                          onClick={() => buyNft(nft)}>
                          <img
                            className="btn"
                            src="https://ipfs.io/ipfs/QmdE2dkSSvthH8D1AXqprn5D9zFDzhrM2nZsAZwMR2UFyv"
                            alt="" />
                        </button>
                      </div>
                      <div
                        className="bg-yellow-200 h-14 flex justify-center items-center mt-3 mb-3 mr-3 rounded-md">
                        <PaperAirplaneIcon className="btn" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="">

                <div style={{ height: '70px', overflow: 'hidden' }}>

                  <p className="ml-6 mt-2 mr-6 text-white justify-center">{nft.description}</p>
                  
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}
export default Posts;

