import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useActivityFormStore from '../../store/activityForm.store';

function CustomActivityForm() {
    const { register, handleSubmit, watch } = useForm();
    const updateField = useActivityFormStore((state) => state.updateField);
    const { formData } = useActivityFormStore();

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name) {
                updateField(name, value[name]);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, updateField]);

    return (
        <div className="space-y-7 xl:w-96 md:w-80">
            <div className="space-y-1 ">
                <p className="text-xs mb-[5px] font-extrabold dark:text-dark-dc-menu-text">
                    Details
                </p>
                <input
                    defaultValue={formData.details}
                    {...register('details')}
                    className="w-full outline-none px-3 rounded-md py-[10px] text-sm dark:text-dark-dc-menu-text dark:bg-dark-dc-primary bg-light-dc-menu-text"
                    type="text"
                />
            </div>

            <div className="space-y-1">
                <p className="text-xs mb-[5px] font-extrabold dark:text-dark-dc-menu-text">
                    State
                </p>
                <input
                    defaultValue={formData.state}
                    {...register('state')}
                    className="w-full outline-none px-3 rounded-md py-[10px] text-sm dark:text-dark-dc-menu-text dark:bg-dark-dc-primary bg-light-dc-menu-text"
                    type="text"
                />
            </div>

            <hr className="dark:border-[#404147]" />

            <div className="space-y-1">
                <p className="text-xs mb-[5px] font-extrabold dark:text-dark-dc-menu-text">
                    Large Image Key
                </p>
                <input
                    defaultValue={formData.large_image_key}
                    {...register('large_image_key')}
                    className="w-full outline-none px-3 rounded-md py-[10px] text-sm dark:text-dark-dc-menu-text dark:bg-dark-dc-primary bg-light-dc-menu-text"
                    type="text"
                />
            </div>

            <div className="space-y-1">
                <p className="text-xs mb-[5px] font-extrabold dark:text-dark-dc-menu-text">
                    Large Image Text
                </p>
                <input
                    defaultValue={formData.large_image_text}
                    {...register('large_image_text')}
                    className="w-full outline-none px-3 rounded-md py-[10px] text-sm dark:text-dark-dc-menu-text dark:bg-dark-dc-primary bg-light-dc-menu-text"
                    type="text"
                />
            </div>

            <hr className="dark:border-[#404147]" />

            <div className="space-y-1">
                <p className="text-xs mb-[5px] font-extrabold dark:text-dark-dc-menu-text">
                    Small Image Key
                </p>
                <input
                    defaultValue={formData.small_image_key}
                    {...register('small_image_key')}
                    className="w-full outline-none px-3 rounded-md py-[10px] text-sm dark:text-dark-dc-menu-text dark:bg-dark-dc-primary bg-light-dc-menu-text"
                    type="text"
                />
            </div>

            <div className="space-y-1">
                <p className="text-xs mb-[5px] font-extrabold dark:text-dark-dc-menu-text">
                    Small Image Text
                </p>
                <input
                    defaultValue={formData.small_image_text}
                    {...register('small_image_text')}
                    className="w-full outline-none px-3 rounded-md py-[10px] text-sm dark:text-dark-dc-menu-text dark:bg-dark-dc-primary bg-light-dc-menu-text"
                    type="text"
                />
            </div>
        </div>
    );
}

export default CustomActivityForm;
