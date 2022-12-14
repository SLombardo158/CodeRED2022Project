import Head from 'next/head'

export default function LocationPage({location}) {
  return (
    <div>
      <Head>
        <title>Location</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className='h-screen bg-gradient-to-b from-slate-900 to-slate-800'>
        {/* Headline Intorduction */}
        <h1 className="flex items-center place-content-center pt-12 text-white text-6xl font-bold"> 
          <a className='ml-4 underline text-blue-600 hover:text-blue-500' href=''>Location:{location}</a>
        </h1>
      </main>
    </div>
  )
}