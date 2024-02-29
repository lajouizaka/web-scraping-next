import { Database, verbose } from 'sqlite3';
import { Product } from '../products/List';
import db from './database';

const sqlite3 = verbose();

export class ProductStore {
    private db: Database;

    constructor() {
        this.db = db.open();

        this.db.serialize(() => {
            this.db.run(
                `CREATE TABLE IF NOT EXISTS products (
                        id INTEGER PRIMARY KEY,
                        title VARCHAR(255),
                        image_path VARCHAR(255),
                        image_url VARCHAR(255),
                        url VARCHAR(255),
                        avg_ratings FLOAT,
                        ratings FLOAT,
                        price FLOAT,
                        search_result_id INTEGER,
                        FOREIGN KEY(search_result_id) REFERENCES search_results(id)
                    );`,
                err => {
                    if (err) console.error(err);
                }
            );
        });
    }

    async all() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM products;', (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    store(product: Omit<Product, 'id'>) {
        this.db.serialize(() => {
            const INSERT_SQL = `INSERT INTO
                                    products
                                    (title,image_path,image_url,url,avg_ratings,ratings,price,search_result_id)
                                    VALUES
                                    (?,?,?,?,?,?,?,?);`;

            this.db.run(
                INSERT_SQL,
                [
                    product.title,
                    product.image_path,
                    product.image_url,
                    product.url,
                    product.avg_rating,
                    product.ratings,
                    product.price,
                    product.search_result_id,
                ],
                err => {
                    if (err) console.error(err);
                }
            );
        });
    }

    async storeMany(products: Product[]) {
        products.forEach(product => {
            this.store(product);
        });
    }

    close() {
        db.close();
    }
}
