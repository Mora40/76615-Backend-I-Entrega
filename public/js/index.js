//* CLIENT - CLIENTE
console.log("IN CLIENT");

//* Conexión con el servidor de Socket.IO

const socket = io(); // -> por defecto se conecta al server donde se aloja http://localhost:8080

socket.on("updateProducts", (products) => {
    // Actualiza la lista en el DOM
    const contenedor = document.getElementById("products-list");

    contenedor.innerHTML = ``;
	
	  for (const producto of products) {

		// Por cada elemento del array, creamos una card
		const card = document.createElement("div");
        card.classList.add('width-25');
		
		card.innerHTML = `
    <div class="product-item">
            <div class="product-border">
                <div class="product-img-center">
                    <a href="#">
                    <img class="product-img" src="/public/img/uploads/${producto.thumbnail}">
                    </a>
                </div>
                <div>
                    <p class="product-name">
                        <a>${producto.title}</a>
                    </p>
                    <p class="product-price">
                        <span class="product-original-price">${producto.price} $</span>
                        <span class="cantidad-carrito" id="cantidad-${producto.id}">Stock: ${producto.stock}</span>
                    </p>
                </div>
            </div>
        </div>
		`
        contenedor.appendChild(card)
  }
  });