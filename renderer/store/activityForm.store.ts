import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ActivityForm {
    formData: Record<string, any>;
    updateField: (field: string, value: any) => void;
}

const useActivityFormStore = create<ActivityForm>()(
    persist(
        (set) => ({
            formData: {},
            updateField: (field, value) =>
                set((state) => ({
                    formData: { ...state.formData, [field]: value },
                })),
        }),
        {
            name: 'custom-activity-form',
        }
    )
);

export default useActivityFormStore;
