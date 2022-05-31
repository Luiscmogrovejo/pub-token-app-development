import Image from 'next/image';
import { 
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon,
 } from "@heroicons/react/outline";
 import { HomeIcon } from "@heroicons/react/solid";
 import { useWeb3React } from "@web3-react/core"
 import { useEffect } from "react"
 import { injected } from "./wallet/connectors"
 import Link from 'next/link'


function Header() {

  const { active, account, library, connector, activate, deactivate } = useWeb3React()

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
        <div className="shadow-sm border-b bg-white sticky top-0 z-50">
            <div className="flex justify-between max-w-6xl mx-5 xl:mx-auto">
            {/* Left - App Logo*/}
            <Link href="/">
            <div className="relative hidden lg:inline-grid w-24 cursor-pointer">
                <Image
                    src="https://ipfs.io/ipfs/QmSKKzeeBM13NtV7VZ6skESUwVsJFEdPy32jDbdVysRbAZ"
                    layout='fill'
                    objectFit='contian'
                />
            </div>
            </Link>
            <Link href="/">
            <div className="relative lg:hidden w-10 flex-shrink-0 cursor-pointer">
                <Image
                    src="https://ipfs.io/ipfs/QmSGRA56LjBeVE6AXzcW6KzQ3ux3nsbhjo5E9UBwKJ5g32"
                    layout='fill'
                    objectFit='contain'
                />
            </div>
            </Link>
            {/* Middle - Search input field*/}
            <div className="max-w-xs">
            <div className="relative mt-1 p-3 rounded-md ">
                <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none" >
                    <SearchIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input 
                    className="bg-gray-50 block w-full pl-10 rounded-md sn:text-sm border-gray-300 focus:ring-black focus:border-black" 
                    type="text" 
                    placeholder="Search" />
            </div>
            </div>
            {/* Right */}
            <div className="flex items-center justify-end space-x-4">
            <Link href="/dashboard"><HomeIcon className="navBtn"/></Link>
            <MenuIcon className="h-6 md:hidden cursor-pointer "/>
            <div className="navBtn relative">
                <PaperAirplaneIcon className="navBtn rotate-45"/>
                <div className="absolute text-white -top-2 -right-1 text-xs h-5 w-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">3</div>
            </div>
            <Link href="/create-nft">
              <PlusCircleIcon className="navBtn"/>
            </Link>
            <Link href="/discover"><UserGroupIcon className="navBtn"/></Link>
            <HeartIcon className="navBtn"/>
            <button 
              onClick={connect} 
              className="ml-2 mr-2 text-xs font-bold text-white rounded-lg w-36 items-center justify-center h-10 bg-blue-600 hover:bg-blue-800">
                {
                  active ? 
                    <div>
                        <span className="semi-bold">Connected to </span>
                        <div className="items-center justify center">
                        <p className="ml-6 truncate w-24 ">{account}</p>
                        </div>
                    </div> : 
                    <span>
                      Connect to MetaMask
                    </span>
                  }
                </button>
            {active ?
            <img onClick={disconnect}
                    src="https://ipfs.io/ipfs/bafybeicygf4nm6fu5p5f23lteaemt6l7atg5y67736qtshbmvh342zmmw4"
                    alt="Profile Connected" 
                    className="h-10 rounded-full cursor-pointer"
            /> 
            : <img
                src="https://ipfs.io/ipfs/QmduBRwBJXL9C7WeP6JKbhSvKTynQhjHghedjcZBs9b2VN"
                alt="Disconnect Account" 
                className="h-10 rounded-full cursor-pointer"
    /> }
            </div>
            </div>
        </div>
    )
};

export default Header;