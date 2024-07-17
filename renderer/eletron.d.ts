export interface IpcRenderer {
    send: (channel: string, data?: any) => void;
    on: (channel: string, func: (...args: any[]) => void) => void;
    removeAllListeners: (channel: string) => void;
}

declare global {
    interface Window {
        electron?: {
            ipcRenderer: IpcRenderer;
        };
        ipc?: {
            send: (channel: string, value: unknown) => void;
            on: (
                channel: string,
                callback: (...args: unknown[]) => void
            ) => () => void;
            addProfile(clientID: string, userID: string): Promise<number>;
            getProfiles(): Promise<any[]>;
            getProfileById(id: number): Promise<any>;
            updateProfile(
                id: number,
                clientID: string,
                userID: string
            ): Promise<boolean>;
            deleteProfile(id: number): Promise<boolean>;
        };
    }
}
