import { Database, verbose } from 'sqlite3';

interface DB {
    db: Database | undefined;
    open: () => Database;
    close: () => void;
}

const db: DB = {
    db: undefined,
    open() {
        if (!this.db) {
            const sqlite3 = verbose();

            this.db = new sqlite3.Database(
                './database/data-set.db',
                sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
                err => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log('Connected to the SQlite database.');
                }
            );
        }

        return this.db;
    },
    close() {
        this.db?.close(() => {
            console.log('database is closed');
        });
    },
};

export default db;
