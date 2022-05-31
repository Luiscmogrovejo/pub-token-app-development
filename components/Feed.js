import React from 'react';
import Stories from './Stories';
import Nfts4sale from './Nfts4sale';
import MiniProfile from './MiniProfile';
import Suggestions from './Suggestions';

export default function Feed() {
    
    return (
        <main className="flex justify-center ">
            <section className="w-2/3">

                <Nfts4sale />
            </section>

            {/* <section className="hidden xl:inline-grid md:col-span-1">
                <div className="fixed top-10">
                    <MiniProfile />
                    <Suggestions />
                </div>
            </section> */}

        </main>
    )
}
