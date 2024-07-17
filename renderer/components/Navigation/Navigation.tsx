import React from 'react';
import HomeButton from './HomeButton';
import SettingButton from './SettingButton';
import Activities from './Activities';

function Navigation() {
    return (
        <div className="w-full px-4 py-3 dark:bg-dark-dc-primary bg-light-dc-pirmary flex flex-row justify-between sticky top-0">
            <HomeButton />
            <Activities />
            <SettingButton />
        </div>
    );
}

export default Navigation;
