const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All products',
            path: '/products',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId
        // console.log(prodId);
    Product.getById(prodId, product => {
        // console.log(product);
        res.render('shop/product-details', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        })
    })
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    });
};

exports.getCart = (req, res, next) => {
    Cart.getFromCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = []
            for (product of products) {
                const cartProductsData = cart.products.find(prod => prod.id === product.id)
                if (cartProductsData) {
                    cartProducts.push({ products: product, quantity: cartProductsData.quantity })
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your cart',
                products: cartProducts
            })
        })
    })
}

exports.postCart = (req, res, next) => {
    // console.log(req.body.productId);
    const prodId = req.body.productId
    Product.getById(prodId, product => {
        Cart.addToCart(prodId, product.price)
    })
    res.redirect('/cart')
}

exports.postDeleteFromCart = (req, res, next) => {
    const prodId = req.body.productId
    Product.getById(prodId, product => {
        Cart.deleteFromCart(prodId, product.price)
        res.redirect('/cart')
    })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your orders'
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout page'
    })
}