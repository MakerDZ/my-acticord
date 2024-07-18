// import { ipcMain } from 'electron';
// import {
//     insertProfile,
//     getProfiles,
//     getProfileById,
//     updateProfile,
//     deleteProfile,
// } from './database';

// export function setupIpcHandlers() {
//     ipcMain.handle('db-insert-profile', (event, clientID, userID) => {
//         return insertProfile(clientID, userID);
//     });

//     ipcMain.handle('db-get-profiles', () => {
//         return getProfiles();
//     });

//     ipcMain.handle('db-get-profile-by-id', (event, id) => {
//         return getProfileById(id);
//     });

//     ipcMain.handle('db-update-profile', (event, id, clientID, userID) => {
//         return updateProfile(id, clientID, userID);
//     });

//     ipcMain.handle('db-delete-profile', (event, id) => {
//         return deleteProfile(id);
//     });
// }
