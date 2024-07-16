import React, { useState } from 'react';
import useThemeStore from '../../store/theme.store';
import { FaDiscord } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import path from 'path';

function HomeButton() {
    const pathName = usePathname();
    const [isBouncing, setIsBouncing] = useState(false);
    const { theme } = useThemeStore();
    const handleClick = () => {
        setIsBouncing(true);
        setTimeout(() => setIsBouncing(false), 500);
    };

    return (
        <div
            onClick={handleClick}
            className={`dark:bg-dark-dc-secondary bg-light-dc-secondary w-12 h-12 rounded-full hover:cursor-pointer flex flex-col justify-center ${isBouncing ? 'animate-bounce-slow' : ''}`}
        >
            <FaDiscord
                className="mx-auto"
                size={25}
                color={theme == 'dark' ? '#DBDEE1' : '#303338'}
            />
        </div>
    );
}

export default HomeButton;

// Coming Soon
{
    /* <div
    onClick={handleClick}
    className={`${pathName === '/home/' ? 'bg-dc-blue rounded-2xl' : 'dark:bg-dark-dc-secondary bg-light-dc-secondary rounded-full'} w-12 h-12 hover:cursor-pointer flex flex-col justify-center ${isBouncing ? 'animate-bounce-slow' : ''}`}
>
    <FaDiscord
        className="mx-auto"
        size={25}
        color={
            pathName === '/home/'
                ? '#ffffff'
                : theme == 'dark'
                    ? '#DBDEE1'
                    : '#303338'
        }
    />
</div> */
}
