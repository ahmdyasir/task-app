const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "cart.json"
);

module.exports = class Cart {
    static addProduct(id, productPrice, productImgUrl){
        fs.readFile(p, (err, result) => {
            let cart = {products: [], totalPrice: 0};
            if (!err) {
                cart = JSON.parse(result);
            }
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else{
                updatedProduct = {id: id, qty: 1, img: productImgUrl};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        })
    }

    static deleteProduct(id, productPrice){
        fs.readFile(p, (err, result) => {
            if (err) {
                return;
            }
            const updatedCart = {...JSON.parse(result)};
            const product = updatedCart.products.find(prod => prod.id === id);
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            })
        });
    };

    static getCart(callBack){
        fs.readFile(p, (err, result) => {
            const cart = JSON.parse(result);
            if (err) {
                callBack(null);
            }else{
                callBack(cart)
            }
        })
    }
};