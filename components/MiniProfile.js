import React from 'react'
import { 
DotsVerticalIcon,
 } from "@heroicons/react/outline";

function Miniprofile(props) {
    

    return (
        <div className="h-36 flex justify-between overflow-hidden mb-1">            
        <div className="ml-4">
          <img 
              className="rounded-full border p-[2px] w-24 h-24" 
              src="https://ipfs.io/ipfs/bafybeicygf4nm6fu5p5f23lteaemt6l7atg5y67736qtshbmvh342zmmw4" 
              alt="" />
          <p className="text-center text-gray-100 mt-1 w-24 truncat">Artist Name test test test test test test test test test</p>
        </div>
      <div className="flex-1 ml-4">
    <div className="h-36 flex relative">
      <h3 className="text-sm text-gray-100 font-light mr-10 text-left">Welcome to PubToken,Welcome to PubToken,Welcome to PubToken,Welcome to PubToken,Welcome to PubToken,Welcome to PubToken,Welcome to PubToken,Welcome to PubToken,Welcome to PubToken,Welcome to PubToken,Welcome to PubToken,Welcome to PubToken,Welcome to PubTokenWelcome to PubToken,Welcome to PubToken,Welcome to PubToken,Welcome to PubToken,Welcome to PubToken,Welcome to PubToken,Welcome to PubToken,Welcome to PubToken,Welcome to PubToken,Welcome to PubToken,Welcome to PubToken,Welcome to PubToken,Welcome to PubToken</h3>
      <div className="absolute w-8 h-20 rounded-md flex justify-center right-0 top-0">
    <DotsVerticalIcon className="text-white" />
    </div>
    </div>

</div>
</div>
    )
}
export default Miniprofile;