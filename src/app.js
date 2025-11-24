import express from 'express';
import routes from './routes/index.js'; 
import config from '../config/config.js';
import ProductsManager from './productmanager.js';
import { engine } from "express-handlebars";
import { Server } from 'socket.io';

const managerProduct = new ProductsManager(config.productsDataPath);

const app = express();

app.engine("hbs", engine({
    extname: ".hbs",
    defaultLayout: "main",
    // layoutsDir: path.join(config.publicPath, "layouts"),
    // partialsDir: path.join(config.publicPath, "partials"),
}));

app.set("view engine", "hbs");
app.set("views", config.viewsPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(config.publicPath));

app.use('/api', routes);

app.get("/", (req, res) => {
    const context = { title: "Home Page" };
    res.render("pages/home", context);
});

app.get("/realTimeProducts", async (req, res) => {
    try {
        const allProducts = await managerProduct.getProducts()
        const context = { products: allProducts };
        return res.render("pages/realTimeProducts", context);
    } catch (err) {
        console.error(err.message);
    }
});

import http from 'http';
const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`Usuario ID: ${socket.id} Conectado!!!`);



  // NUESTRO EVENTO DE EMITIR

  socket.on("disconnect", (data) => {
    console.log("----> ", data); // transport close
    console.log("Cliente desconectado:", socket.id);
  });
});

export { app, server, io };
