import {
    SearchIcon,
    BellIcon,
 } from "@heroicons/react/outline";
 import { useWeb3React } from "@web3-react/core"
 import { useEffect } from "react"
 import { injected } from "../components/wallet/connectors"



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

                <div className="rounded-md absolute bg-gray-300 inset-y-0 w-14 h-12 pointer-events-none flex items-center justify-center" >
                    <SearchIcon className="h-8 w-8 text-gray-500 " />
                </div>

                <input
                    className="bg-gray-50 h-12 shadow-md rounded-md pl-16 pt-1 pb-1 w-full border-gray-900 focus:ring-black focus:border-black"
                    type="text"
                    placeholder="Search items, collections and accounts" />
                <div className="absolute bg-orange-300 w-14 h-12 rounded-md flex items-center justify-center right-0 top-0" >
                    <BellIcon className="h-8 w-8 text-gray-500 " />
                </div>
                </div>
                </div>
        </div>
        {/*Wallet Connect*/}
        <div className="flex justify-center mt-3">
        {active ? <button
                        onClick={copyWallet} 
                        className="ml-2 mr-2 text-md font-bold text-green-600 rounded-lg w-60 h-14 bg-white hover:bg-yellow-100" >
                          {
                            active ?
                              <div>
                                  <span className="semi-bold">Connected to </span>
                                  <div className="items-center justify center">
                                  <p className="ml-6 truncate w-48 ">{account}</p>
                                  </div>
                              </div> :
                              <span className="text-xl">
                                Connect to MetaMask
                              </span>
                            }
                  </button>: <button
              onClick={connect} 
              className="ml-2 mr-2 text-md font-bold text-green-600 rounded-lg w-60 h-14 bg-white hover:bg-yellow-100" >
                {
                  active ?
                    <div>
                        <span className="semi-bold">Connected to </span>
                        <div className="items-center justify center">
                        <p className="ml-6 truncate w-48 ">{account}</p>
                        </div>
                    </div> :
                    <span className="text-xl">
                      Connect to MetaMask
                    </span>
                  }
        </button>}
        <div>
            {active ?
            <img onClick={disconnect}
                    src="https://ipfs.io/ipfs/bafybeicygf4nm6fu5p5f23lteaemt6l7atg5y67736qtshbmvh342zmmw4"
                    alt="Profile Connected"
                    className="h-14 rounded-full cursor-pointer"
            />
            : <img 
                src="https://ipfs.io/ipfs/QmduBRwBJXL9C7WeP6JKbhSvKTynQhjHghedjcZBs9b2VN"
                alt="Disconnect Account"
                className="h-14 rounded-full cursor-pointer"
          /> }
          </div>
        </div>
      {/*Header Menu*/}
        </section>

        </div>  
    )
};

export default Header;