import express from 'express'; 

const router = express.Router();

import productsRouter from './product.router.js'
import cartsRouter from './cart.router.js'

router.use("/products",productsRouter);
router.use("/carts",cartsRouter);

export default router; 