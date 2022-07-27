const peliculas = [
    {id:1, 
    nombre:"jumanji", 
    precio: 800, 
    imagen:"./public-/jumanji.jpg",
    },
    {id:2,
    nombre:"toy story",
     precio: 850, 
    imagen:"./public-/toy story.webp",
    },
    {id:3,
    nombre:"rapidos y furiosos 9",
    precio: 900,
    imagen:"./public-/rapidos y furiosos.webp",
    },
    {id:4,
    nombre:"doctor strange",
    precio: 900,
    imagen:"./public-/strange.jpg",
    },
    {id:5, 
    nombre:"sonic 2", 
    precio: 750, 
    imagen:"./public-/sonic.jpg",
    },
    {id:6, 
     nombre:"buzzlightyear", 
    precio: 800, 
    imagen:"./public-/lightyear.jfif",
    },
];

const contenedor = document.getElementById("container");
peliculas.forEach((pelicula,indice)=>{
    let card = document.createElement("div");
    card.classList.add("card", "col-md-4", "bg-black", "text-light", "border-light")
    let contenido =`<img src="${pelicula.imagen}" class="card-img-top" style="width: 420px; height: 420px;"  alt="...">
    <div class="card-body">
      <h5 class="card-title">${pelicula.nombre}</h5>
      <p class="card-text">$ ${pelicula.precio}</p>
      <a href="#" class="btn btn-danger" onClick= "agregarAlcarrito(${indice})">comprar entradas</a>
    </div>`
    card.innerHTML= contenido;
    contenedor.appendChild(card);

});

let carrito = document.getElementById("cart");
let total = 0;
function plasmarCarrito(){
    carrito.className= "cart";
    carrito.innerHTML= "";
    if (cart.length > 0 ){
        cart.forEach((pelicula,indice)=>{
        total = total + pelicula.precio * pelicula.entrada;
        const carritoContainer = document.createElement("div");
        carritoContainer.className = "pelicula-carrito";
        carritoContainer.innerHTML = `
        <img src="${pelicula.imagen}" class="car-img" alt="...">
        <div class="product-details"> ${pelicula.nombre} </div>
        <div class="product-details"> Entradas: ${pelicula.entrada} </div>
        <div class="product-details"> Precio:$ ${pelicula.precio} </div>
        <div class="product-details"> Subtotal: $${pelicula.precio * pelicula.entrada} </div>
        <button id="remove-product" class="btn btn-warning" onClick = "removeProduct (${indice})">Eliminar entrada</button>`;
        carrito.appendChild(carritoContainer);
    });

const totalcontainer = document.createElement("div");
totalcontainer.classname = "total-carrito";
totalcontainer.innerHTML = `<div class="total"> TOTAL: $${total} </div>
<button  class="btn btn-warning finalizar" id="finalizar" onClick="finalizarCompra()">FINALIZAR COMPRA</button>`;
carrito.appendChild(totalcontainer);

}else{
 carrito.classList.remove("cart");
}
};


let cart= [];

function agregarAlcarrito(indice){
    const indiceEncontrado= cart.findIndex((elemento)=>{
        return elemento.id == peliculas[indice].id
    });
    if (indiceEncontrado== -1){
        const entradaAgregar= peliculas[indice];
        entradaAgregar.entrada = 1
        cart.push(entradaAgregar);
        actualizarLS(cart);
        plasmarCarrito();
    }else {
        cart[indiceEncontrado].entrada += 1
        actualizarLS(cart);
        plasmarCarrito();
    }
};

const removeProduct = (indice)=>{
    cart.splice(indice, 1);
    actualizarLS(cart);
    plasmarCarrito()
    Toastify({
        text: "SE ELIMINÓ LA ENTRADA",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "red",
        },
        onClick: function(){} 
      }).showToast();
};

function finalizarCompra(){
    const total = document.getElementsByClassName("total")[0].innerHTML;
    carrito.innerHTML= "";
    const comprafinalizada =`<div class="compra-finalizada">GRACIAS POR COMPRAR EN CINEMAX, EL ${total}</div>`;
    carrito.innerHTML= comprafinalizada;
    Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'TU COMPRA FUE REALIZADA CON EXITO',
        showConfirmButton: false,
        timer: 3000,
        background: "green",
        color: "#fff"

      })
};

function actualizarLS(cart){
    localStorage.setItem("cart",JSON.stringify(cart))
};