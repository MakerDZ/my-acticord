import path from 'path';
import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import DiscordRPC from 'discord-rpc';

let RPC; // Initialize RPC outside to control its lifecycle
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
    serve({ directory: 'app' });
} else {
    app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
    await app.whenReady();

    const mainWindow = createWindow('main', {
        width: 1000,
        height: 600,
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
        startRPC();
    });

    ipcMain.on('stop-rpc', () => {
        stopRPC();
    });
})();

app.on('window-all-closed', () => {
    app.quit();
});

ipcMain.on('message', async (event, arg) => {
    event.reply('message', `${arg} World!`);
});

function startRPC() {
    if (RPC) {
        console.log('RPC already started');
        return;
    }

    RPC = new DiscordRPC.Client({ transport: 'ipc' });
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
