import React from 'react'
import Image from 'next/image';
import {
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    UserCircleIcon,
} from "@heroicons/react/outline";
import { HomeIcon, HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import { useWeb3React } from "@web3-react/core"
import { useEffect } from "react"
import { injected } from "../components/wallet/connectors"
import Link from 'next/link'

export default function Footer(props) {


    return (
        <div>
            <section className="flex sticky justify-center">
                <div className="">
                    <div className="flex items-center">

                        <div className="bg-lime-500 footerBtn relative">
                            <Link href="/" className="">
                                <div className="">
                                <Image
                                    src="https://ipfs.io/ipfs/QmQ3xvrBxhFGNeS9jdeinwzWKprxXqoJVBFd9aL33GajBo"
                                    layout='fill'
                                    objectFit='contain'
                                    className='popOut h-12 w-12 '
                                >

                                </Image>
                                <div
                                    className="absolute text-white top-2 right-4 text-md h-8 w-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                                    3
                                </div>
                                </div>
                            </Link>
                        </div>
                        <div className="bg-pink-500 relative footerBtn">
                            <Link href="/create-nft">
                                <Image
                                    src="https://ipfs.io/ipfs/QmWyUuYnQy37TCHWvg4TaPbEf7zruMm7XTxo7zFN1YoP4D"
                                    layout='fill'
                                    objectFit='contain'
                                    className='popOut'
                                />
                            </Link>
                        </div>
                        {/* 
         <div className=" bg-green-400 footerBtn">
            <Link href="/create-nft">
            <PlusCircleIcon className="navBtn"/>
            </Link>
         </div> */}

                        <div className="bg-blue-400 footerBtn relative">
                            <Link href="/dashboard">
                                <Image
                                    src="https://ipfs.io/ipfs/QmP5SUhzqfRXAF3AQAmevh47kVsjdDyM7yH64CMFF5fvnU"
                                    layout='fill'
                                    objectFit='contain'
                                    className='popOut'
                                />
                            </Link>
                        </div>

                        <div className="bg-blue-600 relative footerBtn">
                            <Link href="/dashboard">
                                <UserCircleIcon className="h-16 w-16 popOut" />
                            </Link>
                        </div>

                    </div>
                </div>

            </section>
            <h2 className="text-center text-gray-100 text-2xl mt-2">NFT PUB</h2>
        </div>
    )
}
