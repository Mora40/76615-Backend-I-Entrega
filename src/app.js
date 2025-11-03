// const express = require("express");
import express from 'express'; 
// const config = require("../config/config");
import config from '../config/config.js'; 
import ProductsManager from './productmanager.js';
import CartManager from './cartmanager.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const managerProduct = new ProductsManager(config.productsDataPath);
const managerCart = new CartManager(config.carritoDataPath);

//Rutas para Manejo de Productos (/api/products/) //

//GET /: Debe listar todos los productos de la base de datos.

app.get("/api/products/", async (req, res) => {
    try {
        const allProducts = await managerProduct.getProducts()
        res.status(200).json(allProducts);
    } catch (err) {
        console.error(err.message);
    }
});

//GET /:pid: Debe traer solo el producto con el id proporcionado.

app.get("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await managerProduct.getProductById(id)
        res.status(200).json(product);
    } catch (err) {
        console.error(err.message);
    }
});

//POST /: Debe agregar un nuevo producto con los campos: id, title, description, code, price, status, stock, category, thumbnails

app.post("/api/products/", async (req, res) => {
    try {
        const newProductData = req.body;
        await managerProduct.addProduct(newProductData)

        res.status(201).json({message: "Producto creado"});
    } catch (err) {
        console.error(err.message);
    }
});

//PUT /:pid: Debe actualizar un producto por los campos enviados desde el body. No se debe actualizar ni eliminar el id al momento de hacer la actualización.

app.put("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateProductData = req.body;
        await managerProduct.updateProductById(updateProductData,id)

        res.status(204).json("Producto actualizado");
    } catch (err) {
        console.error(err.message);
    }
});

//DELETE /:pid: Debe eliminar el producto con el pid indicado.

app.delete("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await managerProduct.deleteProductById(id)
        res.status(204).json("Producto eliminado");
    } catch (err) {
        console.log(err.message);
    }
});


//Rutas para Manejo de Carritos (/api/carts/)//

//POST /: Debe crear un nuevo carrito con la siguiente estructura: id, products: Array que contendrá objetos que representen cada producto. 

app.post("/api/carts/", async (req, res) => {
    try {
        const cartsData = req.body;
        await managerCart.addCart(cartsData)

        res.status(201).json({message: "Carrito creado"});
    } catch (err) {
        console.error(err.message);
    }
});

// GET /:cid: Debe listar los productos que pertenecen al carrito con el cid proporcionado.

app.get("/api/carts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await managerCart.getCartById(id)
        res.status(200).json(cart);
    } catch (err) {
        console.error(err.message);
    }
});

// POST /:cid/product/:pid: Debe agregar el producto al arreglo products del carrito seleccionado, utilizando el siguiente formato: product: Solo debe contener el ID del producto. quantity: Debe contener el número de ejemplares de dicho producto (se agregará de uno en uno). Si un producto ya existente intenta agregarse, se debe incrementar el campo quantity de dicho producto.

app.post("/api/carts/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        await managerCart.addCartProduct({cid,pid}) 

        res.status(201).json({message: "Producto creado/agregado"});
    } catch (err) {
        console.error(err.message);
    }
});


export default app;
