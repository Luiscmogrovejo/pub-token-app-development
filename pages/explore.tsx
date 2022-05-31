
import { useState, useEffect } from 'react';
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const Explore = () => {
    const web3 = createAlchemyWeb3(
        "https://eth-rinkeby.alchemyapi.io/v2/",
      );
    const [owner, setOwner] = useState("")
    const [NFTs, setNFTs] = useState([])
    useEffect(() => 
        NFTGetter()
      , [])

    async function NFTGetter(owner) {
        const NFTs = await web3.alchemy.getNfts(owner)
        console.log(NFTs)
        setNFTs(NFTs.ownedNfts)
    }

    return (
        <div>
            <header className=' py-24  mb-12 w-full   alchemy'>
                <div className='flex-grow flex justify-end mr-12 mb-12'>
                </div>
                <div className='flex flex-col items-center mb-12'>
                    <div className='mb-16 text-black text-center'>
                        <h1 className='text-5xl  font-bold font-body mb-2'>
                            Alchemy NFT Explorer
                        </h1>
                        <p>An inspector to find NFTs by owner and contract address </p>
                    </div>
                    <div className='flex flex-col items-center justify-center mb-4 w-2/6 gap-y-2 '>
                    <input className="border rounded-sm focus:outline-none py-2 px-3 w-full" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder='Insert your wallet address'></input>
                    </div>
                    <div className='w-2/6 flex justify-center'>
                    <button className='py-3 bg-white rounded-sm w-full hover:bg-slate-100' onClick={NFTGetter}>Search</button>
                    </div>
                </div>
            </header>

            <section className='flex flex-wrap justify-center'>
                {
                    NFTs ? NFTs.map(NFT => {
                        
                        return (
                           <div>
                               <h1>
                                   
                               </h1>
                           </div>
                        )
                    }) : <div>No NFTs found</div>
                }
            </section>
        </div>
    )
}


export default Explore