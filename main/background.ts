import path from 'path';
import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import DiscordRPC from 'discord-rpc';
import { createWindow } from './helpers';
// import { setupDatabase } from './database';
// import { setupIpcHandlers } from './ipc-handlers';
import { BrowserWindow } from 'electron';

let RPC;
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
    serve({ directory: 'app' });
} else {
    app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
    await app.whenReady();

    /* In a future update, I want to allow people to track their activities locally. That's why there is a local database. */

    //setupDatabase();
    //setupIpcHandlers();

    const mainWindow = createWindow('main', {
        width: 1000,
        height: 730,
        minWidth: 850,
        minHeight: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    if (isProd) {
        await mainWindow.loadURL('app://./home');
    } else {
        const port = process.argv[2];
        await mainWindow.loadURL(`http://localhost:${port}/home`);
        mainWindow.webContents.openDevTools();
    }

    ipcMain.on('start-rpc', (ctx, data) => {
        startRPC(data);
    });

    ipcMain.on('stop-rpc', () => {
        stopRPC();
    });

    ipcMain.on('test-rpc', (ctx, data) => {
        testRPC(data.clientId);
    });
})();

app.on('window-all-closed', () => {
    app.quit();
});

async function testRPC(clientId: string) {
    const testRPC = new DiscordRPC.Client({ transport: 'ipc' });
    DiscordRPC.register(clientId);
    testRPC
        .login({ clientId })
        .then(async () => {
            const windows = BrowserWindow.getAllWindows();
            windows.forEach((win) => {
                win.webContents.send('rpc-validation', { success: true });
            });
            console.log('clientID is valid.');
            testRPC
                .destroy()
                .then(() => {
                    RPC = null;
                    console.log('RPC stopped');
                })
                .catch((err) => {
                    console.error('Error stopping RPC', err);
                });
        })
        .catch((err) => {
            console.log(err);
            const windows = BrowserWindow.getAllWindows();
            windows.forEach((win) => {
                win.webContents.send('rpc-validation', {
                    success: false,
                    error: err.message,
                });
            });
        });
}

function startRPC(data: any) {
    if (RPC) {
        RPC.destroy().then(() => {
            emitRPC(data);
        });
        return;
    }
    emitRPC(data);
}

function stopRPC() {
    if (!RPC) {
        console.log('RPC not started');
        return;
    }

    RPC.destroy()
        .then(() => {
            RPC = null;
            console.log('RPC stopped');
        })
        .catch((err) => {
            console.error('Error stopping RPC', err);
        });
}

function emitRPC(data: any) {
    RPC = new DiscordRPC.Client({ transport: 'ipc' });
    DiscordRPC.register(data.clientID);
    RPC.on('ready', async () => {
        console.log('RPC is ready.');
        RPC.setActivity({
            details:
                data.details && data.details.length >= 2
                    ? data.details
                    : `ㅤㅤ`,
            state: data.state && data.state.length >= 2 ? data.state : `ㅤㅤ`,
            startTimestamp: Date.now(),
            largeImageKey:
                data.large_image_key && data.large_image_key.length >= 2
                    ? data.large_image_key
                    : `ㅤㅤ`,
            largeImageText:
                data.large_image_text && data.large_image_text.length >= 2
                    ? data.large_image_text
                    : `ㅤㅤ`,
            smallImageKey:
                data.small_image_key && data.small_image_key.length >= 2
                    ? data.small_image_key
                    : `ㅤㅤ`,
            smallImageText:
                data.small_image_text && data.small_image_text.length >= 2
                    ? data.small_image_text
                    : `ㅤㅤ`,
            instance: false,
        });
    });

    RPC.login({ clientId: data.clientID }).catch((err) => console.log(err));
}
    
  

