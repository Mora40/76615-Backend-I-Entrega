import { readFile, writeFile, readdir, mkdir, stat, access } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';


export default class CartManager {
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
    async #writeFile(carts) {
        try {
        // console.log(this.filePath);
        await writeFile(this.filePath, JSON.stringify(carts, null, 2));
        } catch (error) {
        console.error("Error al escribir el archivo:", error);
        }
    }
    //* CREATE - CREAR - POST
    async addCart({ products=[] }) { 
        try {
        const carts = await this.#readFile();
        const newCart = {
            id: uuidv4(),
            products,
        };
        carts.push(newCart);
        await this.#writeFile(carts);
        } catch (error) {
        console.error("Error al crear el carrito:", error);
        }
    }

    //* BUSCAR Producto POR ID - LEER - GET
    async getCartById(id) {
        try {
        const carts = await this.#readFile();
        const cart = carts.find((u) => u.id === id || null);

        if (!cart) {
            console.log("Id incorrecto");
            return;
        }
        return cart;
        } catch (error) {
        console.error("Error al buscar el carrito:", error);
        }
    }

    async addCartProduct({ cid, pid }) {
        try {
        const carts = await this.#readFile();
        const cart = carts.find((u) => u.id === cid || null);

        if (!cart) {
            console.log("Id de carrito incorrecto");
            return;
        }
        const product = cart.products.find((u) => u.code === pid || null);
        if (!product) {
            const newProduct = {code:pid, quantity: 1 }
            cart.products.push(newProduct)
            await this.#writeFile(carts);
        } else {
            const updatedCartProducts = cart.products.map(prod => {
                if (prod.code === pid) {
                    return { ...prod, quantity: prod.quantity+1, }; 
                }
                return prod;
            });
            const updatedCarts = carts.map(c => {
                if (c.id === cid) {
                    return {...c, products:updatedCartProducts, };
                }
                return c
            })
            await this.#writeFile(updatedCarts);
        }
        
        } catch (error) {
        console.error("Error al agregar un producto al carrito:", error);
        }
    }

}

