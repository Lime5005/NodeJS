const fs = require('fs');
const path = require('path');

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        const p = path.join(
            path.dirname(require.main.filename),
            'data',
            'products.json'
        );
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
                // console.log(123);
            });
        });
    }

    static fetchAll(cb) {
        const p = path.join(
            path.dirname(require.main.filename),
            'data',
            'products.json'
        );
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([]); // If error, callback returns an empty array
            }
            cb(JSON.parse(fileContent));
        });
    }
};