import { Button } from '@nextui-org/button';
import React from 'react';
import useConnectionStore from '../../store/connection.store';
import useActivityFormStore from '../../store/activityForm.store';

export default function GoLive() {
    const { formData } = useActivityFormStore();
    const { connection } = useConnectionStore();

    const startRPC = () => {
        if (window.ipc) {
            window.ipc.send('start-rpc', {
                clientID: connection.clientID,
                ...formData,
            });
        }
    };

    const stopRPC = () => {
        if (window.ipc) {
            window.ipc.send('stop-rpc', '');
        }
    };

    return (
        <div className="xl:w-[350px] md:w-[340px] h-auto dark:bg-dark-dc-primary p-4 rounded-xl bg-light-dc-pirmary flex flex-row justify-between items-center">
            <p className="dark:text-dark-dc-text text-sm">Start Sharing</p>
            <div className="flex flex-row space-x-2">
                <button
                    onClick={stopRPC}
                    className="px-4 dark:text-dark-dc-menu-text text-red-700 text-xs"
                >
                    Stop
                </button>
                <Button onClick={startRPC} size="sm">
                    Go Live
                </Button>
            </div>
        </div>
    );
}
