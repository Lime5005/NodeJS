const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'products.json'
);

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([])
        } else {
            cb(JSON.parse(fileContent))
        }
    })
}

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id
        this.title = title
        this.imageUrl = imageUrl
        this.price = price
        this.description = description
    }

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id)
                const updatedProducts = [...products] // Pull out the existing objects and put them in a new array, to run faster.
                updatedProducts[existingProductIndex] = this
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                    console.log(err);
                });
            }
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb)
    }

    static getById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(product => product.id === id)
            cb(product)
        })
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id)
            const updatedProducts = products.filter(product => product.id !== id)
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (err) {
                    // delete from cart also
                    console.log(err);
                } else {
                    Cart.deleteFromCart(id, product.price)
                }
            })
        })
    }
};