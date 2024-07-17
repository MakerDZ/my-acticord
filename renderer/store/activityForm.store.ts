import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ActivityForm {
    formData: Record<string, any>;
    setFormData: (data: Partial<Record<string, any>>) => void;
    updateField: (field: string, value: any) => void;
}

const useActivityFormStore = create<ActivityForm>()(
    persist(
        (set) => ({
            formData: {},
            setFormData: (data) => set({ formData: data }),
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
