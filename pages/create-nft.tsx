import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import Header from '../components/Header'
import Link from 'next/link'
import Footer from '../components/Footer'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import { marketplaceAddress } from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({
    price: '',
    name: '',
    description: '',
  })
  const router = useRouter()

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      })
      const url = `https://ipfs.infura.io/ipfs/`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }
  async function uploadToIPFS() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/`
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      return url
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async function listNFTForSale() {
    const url = await uploadToIPFS()
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* next, create the item */
    const price = ethers.utils.parseUnits(formInput.price, 'ether')
    let contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    )
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()
    let transaction = await contract.createToken(url, price, {
      value: listingPrice,
    })
    await transaction.wait()

    router.push('/')
  }

  return (
    <div className="bg-neutral-800">
      <Header />
      <main className="relative flex h-screen w-full justify-center">
        <div>
          <section className="">
            <div className="mt-2 w-96">
              <div className="w-full">
                <Link href="/">
                  <button className="mt-4 w-96 rounded-xl border-2 bg-yellow-200 p-4 text-4xl font-bold text-black shadow-lg">
                    Create NFT
                  </button>
                </Link>

                <input
                  type="file"
                  name="Asset"
                  className="my-4 mt-8 flex w-96 rounded border border-gray-500 text-white"
                  onChange={onChange}
                />
                <div className="w-96">
                  <div className="flex justify-center">
                    {fileUrl && (
                      <img className="mt-4 rounded" width="200" src={fileUrl} />
                    )}
                  </div>
                </div>
                <input
                  placeholder="Asset Name"
                  className="mt-5 w-96 rounded border-2 border-dashed bg-neutral-800 p-4 text-white"
                  onChange={(e) =>
                    updateFormInput({ ...formInput, name: e.target.value })
                  }
                />
                <textarea
                  placeholder="Asset Description"
                  className="mt-2 w-96 rounded border-2 border-dashed bg-neutral-800 p-4 text-white"
                  onChange={(e) =>
                    updateFormInput({
                      ...formInput,
                      description: e.target.value,
                    })
                  }
                />
                <input
                  placeholder="Asset Price in Eth"
                  className="mt-2 w-96 rounded border-2 border-dashed bg-neutral-800 p-4 text-white"
                  onChange={(e) =>
                    updateFormInput({ ...formInput, price: e.target.value })
                  }
                />

                <div>
                  <div className="">
                    <div class="relative right-0 flex">
                      <div className="mt-4 w-96 rounded-xl border-2 border-dashed">
                        <div class="form-check mt-2">
                          <label
                            class="form-check-label ml-3 inline-block text-3xl text-white"
                            for="flexCheckDefault"
                          >
                            EXCHANGE
                          </label>
                          <input
                            class="form-check-input float-right mt-3 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                        </div>

                        <div class="form-check">
                          <label
                            class="form-check-label ml-3 inline-block  text-3xl text-white"
                            for="flexCheckDefault"
                          >
                            SELL
                          </label>
                          <input
                            class="form-check-input float-right mt-3 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                        </div>

                        <div class="form-check mb-4">
                          <label
                            class="form-check-label ml-3 inline-block  text-3xl text-white"
                            for="flexCheckDefault"
                          >
                            EXCHANGE AND SELL
                          </label>
                          <input
                            class="form-check-input float-right mt-3 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-8 w-96">
                      <div className="relative">
                        <button
                          onClick={listNFTForSale}
                          className="absolute right-0 mt-4 w-36 rounded-xl bg-yellow-200 p-2 text-2xl font-bold text-black shadow-lg"
                        >
                          DONE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="sticky bottom-0 w-full items-center p-20">
        <Footer />
      </footer>
    </div>
  )
}
