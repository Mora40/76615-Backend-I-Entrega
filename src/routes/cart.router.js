import express from 'express';
import config from '../../config/config.js';
import CartManager from '../cartmanager.js';

const router = express.Router();
const managerCart = new CartManager(config.carritoDataPath);

//Rutas para Manejo de Carritos (/api/carts/)//

//POST /: Debe crear un nuevo carrito con la siguiente estructura: id, products: Array que contendrá objetos que representen cada producto. 

router.post("/", async (req, res) => {
    try {
        const cartsData = req.body;
        await managerCart.addCart(cartsData)

        res.status(201).json({message: "Carrito creado"});
    } catch (err) {
        console.error(err.message);
    }
});

// GET /:cid: Debe listar los productos que pertenecen al carrito con el cid proporcionado.

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await managerCart.getCartById(id)
        res.status(200).json(cart);
    } catch (err) {
        console.error(err.message);
    }
});

// POST /:cid/product/:pid: Debe agregar el producto al arreglo products del carrito seleccionado, utilizando el siguiente formato: product: Solo debe contener el ID del producto. quantity: Debe contener el número de ejemplares de dicho producto (se agregará de uno en uno). Si un producto ya existente intenta agregarse, se debe incrementar el campo quantity de dicho producto.

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        await managerCart.addCartProduct({cid,pid}) 

        res.status(201).json({message: "Producto creado/agregado"});
    } catch (err) {
        console.error(err.message);
    }
});

export default router;
