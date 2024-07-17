import React from 'react';
import ActivityCard from './ActivityCard';

function ProfileCard() {
    return (
        <div className="space-y-2">
            <p className="dark:text-dark-dc-menu-text font-bold text-sm">
                Preview
            </p>
            <div className="xl:w-[350px] md:w-[340px] h-auto dark:bg-dark-dc-primary rounded-xl bg-light-dc-pirmary pb-6">
                <div className="w-full h-20 bg-orange-400 rounded-t-md"></div>
                <div className="px-4 space-y-3">
                    <div className="w-20 h-20 bg-black rounded-full -mt-10"></div>
                    <div className="px-3 space-y-4">
                        <div>
                            <h1 className="text-base font-black dark:text-dark-dc-text">
                                Zed
                            </h1>
                            <p className="dark:text-dark-dc-menu-text text-sm">
                                zed.im
                            </p>
                        </div>
                        <p className="dark:text-dark-dc-menu-text text-sm">
                            ⭐ Let your Discord friends know what activities
                            you're currently doing!
                        </p>
                        <ActivityCard />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
