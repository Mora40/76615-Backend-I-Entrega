const path = require("path");

const fileDataDinamic = function (nameFile) {
    const mypath = path.join(__dirname, "..", "data", nameFile);
    return mypath;
};

const productsDataPath = fileDataDinamic("products.json");
// console.log("Ruta dinámica:", productsDataPath);

const carritoDataPath = fileDataDinamic("carts.json");
// console.log("Ruta dinámica:", carritoDataPath);

const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../src/views");

module.exports = { productsDataPath, carritoDataPath, publicPath, viewsPath };