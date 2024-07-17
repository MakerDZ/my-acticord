import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Connection {
    display: boolean;
    connection: Record<string, any>;
    updateConnection: (field: string, value: any) => void;
    updateDisplay: (display: boolean) => void;
}

const useConnectionStore = create<Connection>()(
    persist(
        (set) => ({
            display: false,
            connection: {},
            updateConnection: (field, value) =>
                set((state) => ({
                    connection: { ...state.connection, [field]: value },
                })),
            updateDisplay: (display) => set((state) => ({ display })),
        }),
        {
            name: 'connection',
        }
    )
);

export default useConnectionStore;
