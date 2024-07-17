import React from 'react';
import Head from 'next/head';
import ProfileCard from '../components/ProfileConnection/ProfileCard';
import CustomActivityForm from '../components/ProfileConnection/CustomActivityForm';
import GoLive from '../components/ProfileConnection/GoLive';

function Home() {
    const startServer = () => {
        console.log(window.ipc);
        if (window.ipc) {
            console.log('clicked');
            window.ipc.send('start-rpc', { name: 'hello' });
        }
    };

    const stopServer = () => {
        console.log(window.ipc);
        if (window.ipc) {
            window.ipc.send('stop-rpc', '');
        }
    };

    return (
        <React.Fragment>
            <Head>
                <title>My Acticord</title>
            </Head>
            <div className="max-w-[1000px] h-full mx-auto  flex flex-col justify-center">
                <div className="flex flex-row justify-around overflow-y-auto py-9 dark:bg-dark-dc-secondary  bg-light-dc-secondary">
                    <CustomActivityForm />
                    <div className="space-y-4">
                        <ProfileCard />
                        <GoLive />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Home;
