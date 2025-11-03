// const fs = require("fs/promises");
// import fs from 'fs'; 
import { readFile, writeFile, readdir, mkdir, stat, access } from 'fs/promises';
// const { v4: uuidv4 } = require('uuid');
import { v4 as uuidv4 } from 'uuid';


export default class ProductsManager {
    constructor(filePath) {
        this.filePath = filePath;
    }
    async #readFile() {
        try {
        const data = await readFile(this.filePath, "utf-8");
        return JSON.parse(data);
        } catch (error) {
        if (error.code === "ENOENT") return [];
        throw error;
        }
    }
    async #writeFile(products) {
        try {
        // console.log(this.filePath);
        await writeFile(this.filePath, JSON.stringify(products, null, 2));
        } catch (error) {
        console.error("Error al escribir el archivo:", error);
        }
    }
    //* CREATE - CREAR - POST
    async addProduct({ title, description, price, thumbnail, stock }) {
        try {
        if (!title || !description || !price || !thumbnail || !stock) {
            throw new Error(
            "Todos los campos (title, description, price, thumbnail, stock) son obligatorios."
            );
        }
        const products = await this.#readFile();
        const newProduct = {
            code: uuidv4(),
            title, 
            description, 
            price, 
            thumbnail, 
            stock
        };
        products.push(newProduct);
        await this.#writeFile(products);
        } catch (error) {
        console.error("Error al crear el producto:", error);
        }
    }
    //* LEER TODOS los Productos - LEER - GET
    async getProducts() {
        try {
        const products = await this.#readFile();
        // console.log("products-->", products);
        return products;
        } catch (error) {
        console.error("Error al buscar todos los productos:", error);
        }
    }

    //* BUSCAR Producto POR ID - LEER - GET
    async getProductById(code) {
        try {
        const products = await this.#readFile();
        const product = products.find((u) => u.code === code || null);
        // console.log("product->", product);
        if (!product) {
            console.log("Id incorrecto");
            return;
        }
        return product;
        } catch (error) {
        console.error("Error al buscar el producto:", error);
        }
    }

    //* ACTUALIZAR UN USUARIO POR ID - Actualizar - PUT
    //                      {},           id
    async updateProductById(dataUpdateProduct, code) {
        try {
        // Buscar el user por id
        const products = await this.#readFile();
        const product = products.find((u) => u.code === code || null);
        if (!product) {
            console.log("Id incorrecto");
            return;
        }
        const updatedProducts = products.map(prod => {
            if (prod.code === code) {
                return { ...prod, ...dataUpdateProduct, }; 
            }
        return prod;
        });
        await this.#writeFile(updatedProducts);
        } catch (error) {
        console.error("Error al buscar todos los usuarios:", error);
        }
    }

    //* ELIMINAR UN USUARIO POR ID - Eliminar - DELETE
    async deleteProductById(code) {
        try {
            const products = await this.#readFile();
            const index = products.findIndex((u) => u.code === code );

            if (index == -1) {
                console.log("Id incorrecto");
                return;
            }
            products.splice(index, 1);
            await this.#writeFile(products);
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    }
}

