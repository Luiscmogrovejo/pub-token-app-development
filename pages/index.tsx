import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Feed from '../components/Feed'
import Footer from '../components/Footer'

const Home: NextPage = () => {
  return (
    <body className="bg-neutral-800 scrollbar-hide flex h-screen flex-col justify-between overflow-y-scroll">
      {/* Header */}

      <Head>
        <title>PUB Token Marketplce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Feed />
      <footer className="sticky bottom-0 w-full items-center p-8">
        <Footer />
      </footer>
    </body>
  )
}

export default Home
