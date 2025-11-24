import express from 'express';
import config from '../../config/config.js'; 
import ProductsManager from '../productmanager.js';
import multer from 'multer';
import { io } from '../app.js';

const router = express.Router();

// config multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //cb(null, path.join(__dirname,'../../public/img/uploads/'));
        cb(null, 'public/img/uploads/');
    }, 
    filename: function (req, file, cb) {
        const originalName = `img-${req.params.id}-${file.originalname}`;
        //req.query.filename = originalName;
        cb(null, originalName);
    }
});

const upload = multer({ storage: storage });

const managerProduct = new ProductsManager(config.productsDataPath);

//Rutas para Manejo de Productos (/api/products/) //

//GET /: Debe listar todos los productos de la base de datos.

router.get("/", async (req, res) => {
    try {
        const allProducts = await managerProduct.getProducts()
        res.status(200).json(allProducts);
    } catch (err) {
        console.error(err.message);
    }
});

//GET /:pid: Debe traer solo el producto con el id proporcionado.

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await managerProduct.getProductById(id)
        res.status(200).json(product);
    } catch (err) {
        console.error(err.message);
    }
});

//POST /: Debe agregar un nuevo producto con los campos: id, title, description, code, price, status, stock, category, thumbnails

router.post("/", async (req, res) => {
    try {
        const newProductData = req.body;
        await managerProduct.addProduct(newProductData)
        io.emit("updateProducts", await managerProduct.getProducts());
        res.status(201).json({message: "Producto creado"});
    } catch (err) {
        console.error(err.message);
    }
});

//PUT /:pid: Debe actualizar un producto por los campos enviados desde el body. No se debe actualizar ni eliminar el id al momento de hacer la actualización.

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateProductData = req.body;
        await managerProduct.updateProductById(updateProductData,id)
        io.emit("updateProducts", await managerProduct.getProducts());
        res.status(204).json("Producto actualizado");
    } catch (err) {
        console.error(err.message);
    }
});

//DELETE /:pid: Debe eliminar el producto con el pid indicado.

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await managerProduct.deleteProductById(id)
        io.emit("updateProducts", await managerProduct.getProducts());
        res.status(204).json("Producto eliminado");
    } catch (err) {
        console.log(err.message);
    }
});


// Subir una imagen para despues asociarla a un producto (No implementado en el enpoint de productos)

router.post("/:id/upload", upload.single("imagen"), async (req, res) => {
    try {
        const { id } = req.params;
        const { filename } = req.file;

        const product = await managerProduct.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        if (!product.thumbnail) {
            product.thumbnail = [];
        }
        product.thumbnail.push(filename);

        await managerProduct.updateProductById(product, id);

        res.status(200).json({ message: `Se agrego la imagen: ${filename} al producto: ${id}`});
    } catch (err) {
        console.error(err.message);
    }
});

export default router; 