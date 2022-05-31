import Image from 'next/image';
import {
  SearchIcon,
  BellIcon,
} from "@heroicons/react/outline";
import { useWeb3React } from "@web3-react/core"
import { useEffect } from "react"
import { injected } from "../components/wallet/connectors"
import Link from "next/link"


function Header() {


  const { active, account, library, connector, activate, deactivate } = useWeb3React();

  async function connect() {
    try {
      await activate(injected)
      localStorage.setItem('isWalletConnected', true)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
      localStorage.setItem('isWalletConnected', false)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function copyWallet() {
    /* Get the text field */
    await navigator.clipboard.writeText(account);
    console.log(account)

  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          await activate(injected)
          localStorage.setItem('isWalletConnected', true)
        } catch (ex) {
          console.log(ex)
        }
      }
    }
    connectWalletOnPageLoad()
  }, [])

  return (

    <div class="justify-center top-0 z-50 h-30 sticky w-full">
      <section className="">
        {/*Search Bar TOP*/}
        <div className="flex justify-center w-full">
          <div className="mt-1 p-3 rounded-md w-2/3">
            <div className="relative h-10 ">

              <div className="rounded-md absolute bg-gray-300 inset-y-0 w-20 h-10 pointer-events-none flex items-center justify-center" >
                <SearchIcon className="h-8 w-8 text-gray-500 " />
              </div>

              <input
                className="bg-gray-50 h-10 shadow-md rounded-md pl-24 pt-1 pb-1 w-full border-gray-900 focus:ring-black focus:border-black"
                type="text"
                placeholder="Search items, collections and accounts" />
              <div className="absolute bg-lime-500 w-20 h-10 rounded-md flex items-center justify-center right-0 top-0" >
                <Image
                  src="https://ipfs.io/ipfs/QmavFVgYxUXYkYbkzZ9dgmj2ofLQ5orAHQ7zjRERrMbnJC"
                  layout='fill'
                  objectFit='contain'
                  className='popOut'
                />
              </div>
            </div>
          </div>
        </div>
        {/*Wallet Connect*/}
        <div className="flex items-center justify-center">
          {active ? <button
            onClick={copyWallet}
            className="ml-2 mr-2 text-md font-bold text-green-600 rounded-lg w-60 h-10 bg-white hover:bg-yellow-100" >
            {
              active ?
                <div>
                  {/* <span className="semi-bold">Connected to </span> */}
                  <div className="items-center justify center">
                    <p className="ml-6 truncate w-48 ">{account}</p>
                  </div>
                </div> :
                <span className="text-md">
                  Connect to MetaMask
                </span>
            }
          </button> : <button
            onClick={connect}
            className="ml-2 mr-2 text-md font-bold text-green-600 rounded-lg w-60 h-10 bg-white hover:bg-yellow-100" >
            {
              active ?
                <div>
                  {/* <span className="semi-bold">Connected to </span> */}
                  <div className="items-center justify center">
                    <p className="ml-6 truncate w-48 ">{account}</p>
                  </div>
                </div> :
                <span className="text-md">
                  Connect to MetaMask
                </span>
            }
          </button>}
        </div>
        {/*Header Menu*/}
        <div className="flex justify-center mt-3">
          <div className="bg-yellow-300 headerBtn" >
            <BellIcon className="h-14 w-14 popOut" />
          </div>
          <div className="bg-lime-600 headerBtn" >
            <Link href="/">
              <Image
                src="https://ipfs.io/ipfs/QmUPBY1sBQv8TFGERbFs329Yd3XSHJyf81M2MW85SJaRD5"
                layout='fill'
                objectFit='contain'
                className='popOut'
              />
            </Link>
          </div>

          <div className="bg-orange-500 headerBtn" >
            <Link href="/">
              <Image
                src="https://ipfs.io/ipfs/Qmf3wpyJyPqAkrfn4RReFzXqWUoAUzj3UTHXgrW8hTzXUh"
                layout='fill'
                objectFit='contain'
                className='popOut'
              />
            </Link>
          </div>
          <div>
            {active ?
              <img onClick={disconnect}
                src="https://ipfs.io/ipfs/bafybeicygf4nm6fu5p5f23lteaemt6l7atg5y67736qtshbmvh342zmmw4"
                alt="Profile Connected"
                className="headerBtn cursor-pointer"
              />
              : <img
                src="https://ipfs.io/ipfs/QmPZXXh6LqtG7PKmzUxDxBNePJURjawk8DQo1LUVR9KnUu"
                alt="Disconnect Account"
                className="headerBtn cursor-pointer w-fit"
              />}
          </div>
        </div>
        {/*Header Menu*/}
      </section>

    </div>
  )
};

export default Header;