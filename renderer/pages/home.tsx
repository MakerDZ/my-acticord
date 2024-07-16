import React from 'react';
import Head from 'next/head';

function Home() {

  const startServer = () => {
    console.log(window.ipc);
    if (window.ipc) {
      console.log('clicked');
      window.ipc.send('start-rpc',{name : 'hello'});
    }
  };

  const stopServer = () => {
    console.log(window.ipc);
    if (window.ipc) {
      window.ipc.send('stop-rpc','');
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>My Acticord</title>
      </Head>
      <div className='flex flex-col space-y-2 w-[150px]'>
        <button className='bg-blue-500 px-2 py-1 rounded-lg text-white' onClick={startServer} >
          Start Server
        </button>
        <button  className='bg-blue-500 px-2 py-1 rounded-lg text-white' onClick={stopServer} >
          Stop Server
        </button>
      </div>
    </React.Fragment>
  );
}

export default Home;