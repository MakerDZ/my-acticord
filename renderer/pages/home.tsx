import React from 'react';
import Head from 'next/head';
import ProfileCard from '../components/ProfileConnection/ProfileCard';
import CustomActivityForm from '../components/ProfileConnection/CustomActivityForm';
import GoLive from '../components/ProfileConnection/GoLive';
import useConnectionStore from '../store/connection.store';
import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/modal';
import ConnectionModal from '../components/ProfileConnection/ConnectionModal';

function Home() {
    const { display } = useConnectionStore();
    const { onOpen, isOpen, onOpenChange, onClose } = useDisclosure();

    const startServer = () => {
        console.log(window.ipc);
        if (window.ipc) {
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
            {display ? (
                <div className="max-w-[1000px] h-full mx-auto  flex flex-col justify-center">
                    <div className="flex flex-row justify-around overflow-y-auto py-9 dark:bg-dark-dc-secondary  bg-light-dc-secondary">
                        <CustomActivityForm />
                        <div className="space-y-4">
                            <ProfileCard />
                            <GoLive />
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="h-full flex flex-col justify-center">
                        <div className="mx-auto space-y-3">
                            <p className="dark:text-dark-dc-menu-text font-semibold">
                                You haven't set up a proper connection.
                            </p>
                            <div className="w-full flex flex-row justify-center">
                                <Button
                                    onClick={onOpen}
                                    className="bg-dc-blue text-white"
                                >
                                    My Connection
                                </Button>
                            </div>
                        </div>
                    </div>
                    <ConnectionModal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        onClose={onClose}
                    />
                </>
            )}
        </React.Fragment>
    );
}

export default Home;
