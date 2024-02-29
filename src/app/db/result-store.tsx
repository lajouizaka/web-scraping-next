import { Database } from 'sqlite3';
import db from './database';

export class ResultStore {
    private db: Database;

    constructor() {
        this.db = db.open();

        this.db.serialize(() => {
            this.db.run(
                `CREATE TABLE IF NOT EXISTS search_results (
                        id INTEGER PRIMARY KEY,
                        created_at DATETIME
                    );`,
                err => {
                    if (err) console.error(err);
                }
            );
        });
    }

    async all() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM search_results;', (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    async store(): Promise<number> {
        const INSERT_SQL = `INSERT INTO
                                    search_results (created_at)
                                    VALUES         (?);`;

        return new Promise((resolve, reject) => {
            this.db.run(
                INSERT_SQL,
                [Date.now()],
                function (err: any, data: any) {
                    if (err) return reject(err);
                    // @ts-ignore
                    resolve(this.lastID);
                }
            );
        });
    }

    close() {
        db.close();
    }
}
