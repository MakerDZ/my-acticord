import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

const handler = {
    send(channel: string, value: unknown) {
        ipcRenderer.send(channel, value);
    },
    on(channel: string, callback: (...args: unknown[]) => void) {
        const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
            callback(...args);
        ipcRenderer.on(channel, subscription);

        return () => {
            ipcRenderer.removeListener(channel, subscription);
        };
    },

    addProfile: (clientID: string, userID: string) =>
        ipcRenderer.invoke('db-insert-profile', clientID, userID),
    getProfiles: () => ipcRenderer.invoke('db-get-profiles'),
    getProfileById: (id: number) =>
        ipcRenderer.invoke('db-get-profile-by-id', id),
    updateProfile: (id: number, clientID: string, userID: string) =>
        ipcRenderer.invoke('db-update-profile', id, clientID, userID),
    deleteProfile: (id: number) => ipcRenderer.invoke('db-delete-profile', id),
};

contextBridge.exposeInMainWorld('ipc', handler);

export type IpcHandler = typeof handler;