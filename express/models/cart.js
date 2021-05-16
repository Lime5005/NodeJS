const fs = require('fs')
const path = require('path')

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addToCart(id, productPrice) {
        // fetch in the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 }
            if (!err) {
                cart = JSON.parse(fileContent)
            }
            // what is there already
            const existingProductIndex = cart.products.findIndex(product => product.id === id)
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct
                // if exist, push into the object, add quantity
            if (existingProduct) {
                updatedProduct = {...existingProduct }
                updatedProduct.quantity += 1
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct
            } else {
                // else, add both the id and the quantity
                updatedProduct = { id: id, quantity: 1 }
                cart.products = [...cart.products, updatedProduct]
            }
            // The price is stored as a string, so it's concatenated, so here add a `+` to convert it
            cart.totalPrice = cart.totalPrice + +productPrice
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            })
        })
    }
}