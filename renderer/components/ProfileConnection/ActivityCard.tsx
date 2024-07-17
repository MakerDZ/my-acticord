import React, { useState } from 'react';
import useActivityFormStore from '../../store/activityForm.store';

function ActivityCard() {
    const { formData } = useActivityFormStore();
    const [largeImageHover, setLargeImageHover] = useState(false);
    const [smallImageHover, setSmallImageHover] = useState(false);

    return (
        <div className="w-full dark:bg-dark-dc-secondary bg-light-dc-secondary rounded-lg p-3 space-y-2">
            <p className="text-[12px] font-semibold dark:text-dark-dc-text ">
                Playing a game
            </p>
            <div className="flex flex-row justify-start space-x-2">
                <div className="relative">
                    <img
                        alt="Large Image Text"
                        src={
                            formData.large_image_key
                                ? formData.large_image_key
                                : '/images/no_selected.webp'
                        }
                        className="bg-indigo-500 w-16 h-16 rounded-md object-cover"
                    />
                    <img
                        alt="Small Image Text"
                        src={
                            formData.small_image_key
                                ? formData.small_image_key
                                : '/images/discord_loading.gif'
                        }
                        className="bg-orange-400 w-7 h-7 absolute -right-1 -bottom-1 rounded-full border-3 dark:border-dark-dc-secondary object-cover"
                    />
                </div>

                <div className="space-y-1">
                    <p className="dark:text-dark-dc-text text-xs font-semibold">
                        My Activity
                    </p>
                    <p className="dark:text-dark-dc-menu-text text-xs">
                        {formData.details}
                    </p>
                    <p className="dark:text-dark-dc-menu-text text-xs">
                        {formData.state}
                    </p>
                    <p className="dark:text-dark-dc-menu-text text-xs">
                        00:00 elapsed
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ActivityCard;
