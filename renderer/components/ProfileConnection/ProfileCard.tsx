import React from 'react';
import ActivityCard from './ActivityCard';
import useProfileData from '../../hooks/useProfileData';

function ProfileCard() {
    const { profileData, profileDataError } = useProfileData();

    return (
        <div className="space-y-2">
            <p className="dark:text-dark-dc-menu-text font-bold text-sm">
                Preview
            </p>
            <div className="xl:w-[350px] md:w-[340px] h-auto dark:bg-dark-dc-primary rounded-xl bg-light-dc-pirmary pb-6">
                {profileData && !profileDataError ? (
                    profileData.banner.id ? (
                        <img
                            src={profileData.banner.link}
                            className="w-full h-20  rounded-t-md object-cover"
                        />
                    ) : (
                        <div
                            style={{
                                backgroundColor: profileData.banner.color,
                            }}
                            className="w-full h-20  rounded-t-md"
                        ></div>
                    )
                ) : (
                    <div className="w-full h-20  rounded-t-md bg-[#5360E4]"></div>
                )}

                <div className="px-4 space-y-3">
                    <img
                        src={
                            profileData && !profileDataError
                                ? profileData.avatar.link
                                : '/images/discord_pfp.jpg'
                        }
                        className="w-20 h-20 rounded-full -mt-10 object-cover dark:border-dark-dc-primary border-light-dc-pirmary border-3"
                    />
                    <div className="px-3 space-y-4">
                        <div>
                            <h1 className="text-base font-black dark:text-dark-dc-text">
                                {profileData && !profileDataError
                                    ? profileData.global_name
                                    : 'Acticord'}
                            </h1>
                            <p className="dark:text-dark-dc-menu-text text-sm">
                                {profileData && !profileDataError
                                    ? profileData.username
                                    : 'acticord'}
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
