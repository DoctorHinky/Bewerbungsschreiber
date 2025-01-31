import Database from "better-sqlite3";
import { config } from "./config";
const db = new Database(config.dbFile);
db.exec(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINKREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
`);
export default db;
