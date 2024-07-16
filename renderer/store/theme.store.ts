import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Theme {
    theme: 'dark' | 'light';
    setTheme: (theme: 'dark' | 'light') => void;
}

const useThemeStore = create<Theme>()(
    persist(
        (set) => ({
            theme: 'dark',
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: 'theme-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useThemeStore;
