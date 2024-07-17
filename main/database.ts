import Database from 'better-sqlite3';
import path from 'path';
import { app } from 'electron';

let db: Database.Database;

export function setupDatabase() {
    const dbPath = path.join(app.getPath('userData'), 'database.sqlite');
    console.log('Database path:', dbPath);

    db = new Database(dbPath);

    db.exec(`
      CREATE TABLE IF NOT EXISTS profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        clientID TEXT,
        userID TEXT
      )
    `);

    console.log('Database setup complete');
}

export function insertProfile(clientID: string, userID: string) {
    const stmt = db.prepare(
        'INSERT INTO profile (clientID, userID) VALUES (?, ?)'
    );
    const result = stmt.run(clientID, userID);
    return result.lastInsertRowid;
}

export function getProfiles() {
    const stmt = db.prepare('SELECT * FROM profile');
    return stmt.all();
}

export function getProfileById(id: number) {
    const stmt = db.prepare('SELECT * FROM profile WHERE id = ?');
    return stmt.get(id);
}

export function updateProfile(id: number, clientID: string, userID: string) {
    const stmt = db.prepare(
        'UPDATE profile SET clientID = ?, userID = ? WHERE id = ?'
    );
    const result = stmt.run(clientID, userID, id);
    return result.changes > 0;
}

export function deleteProfile(id: number) {
    const stmt = db.prepare('DELETE FROM profile WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
}
