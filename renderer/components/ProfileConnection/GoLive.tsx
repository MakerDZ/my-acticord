import { Button } from '@nextui-org/button';
import React from 'react';

export default function GoLive() {
    return (
        <div className="xl:w-[350px] md:w-[340px] h-auto dark:bg-dark-dc-primary p-4 rounded-xl bg-light-dc-pirmary flex flex-row justify-between items-center">
            <p className="dark:text-dark-dc-text text-sm">Start Sharing</p>
            <div className="flex flex-row space-x-2">
                <button className="px-4 dark:text-dark-dc-menu-text text-red-700 text-xs">
                    Stop
                </button>
                <Button size="sm">Go Live</Button>
            </div>
        </div>
    );
}
