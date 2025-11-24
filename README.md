# 76615-Backend-I-Entrega


## Rutas para Manejo de Productos (/api/products/) 

- GET /: Debe listar todos los productos de la base de datos.


- GET /:pid: Debe traer solo el producto con el id proporcionado.


- POST /: Debe agregar un nuevo producto con los campos: id, title, description, code, price, status, stock, category, thumbnails


- PUT /:pid: Debe actualizar un producto por los campos enviados desde el body. No se debe actualizar ni eliminar el id al momento de hacer la actualización.


- DELETE /:pid: Debe eliminar el producto con el pid indicado.


## Rutas para Manejo de Carritos (/api/carts/)

- POST /: Debe crear un nuevo carrito con la siguiente estructura: id, products: Array que contendrá objetos que representen cada producto. 


- GET /:cid: Debe listar los productos que pertenecen al carrito con el cid proporcionado.


- POST /:cid/product/:pid: Debe agregar el producto al arreglo products del carrito seleccionado, utilizando el siguiente formato: product: Solo debe contener el ID del producto. quantity: Debe contener el número de ejemplares de dicho producto (se agregará de uno en uno). Si un producto ya existente intenta agregarse, se debe incrementar el campo quantity de dicho producto.

## realTimeProducts

Con la creacion, actualizacion y eliminacion de productos se actualiza la lista de productos
