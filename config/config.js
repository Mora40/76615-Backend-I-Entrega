const path = require("path");

const fileDataDinamic = function (nameFile) {
    const mypath = path.join(__dirname, "..", "data", nameFile);
    return mypath;
};

const productsDataPath = fileDataDinamic("products.json");
// console.log("Ruta dinámica:", productsDataPath);

const carritoDataPath = fileDataDinamic("carts.json");
// console.log("Ruta dinámica:", carritoDataPath);


module.exports = { productsDataPath, carritoDataPath };