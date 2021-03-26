const container = document.getElementById('container__cards');
const carritovaciohtml = document.querySelector('.carritovacio');
const body= document.querySelector('body');
let carrito =[];
const datos=[
    skate1={
        img:'img/imgskate.png',
        nombre:'Tabla De Skate No Name Face Kid Regular Maple',
        precio:100,
        id:1
    },
    zapatillas={
        img:'img/zapas2.jpg',
        nombre:'Zapatilla Urbana Cuero Descarne Skate Gris',
        precio:50,
        id:2
    },
    gorro={
        img:'img/gorro__skate.jpg',
        nombre:'Gorra Hombre Racks Mujer Visera Skate Surf',
        precio:60,
        id:3
    }

]


datos.forEach(item =>{
    container.innerHTML+=`
    <div class="card container">
           <img src="${item.img}" class="img_card" alt="">
           <div class="infocard " >
                <div class="containerprecio">
                    <p class='preciocard'>$</p>
                    <span class='precio preciocard'>${item.precio}</span>
                </div>
               <h3 class='nombre'>${item.nombre}</h3>
               <button >Agregar al carrito</button>
           </div>
       </div>
    `;
})

/* funcion agregar al carrito */
container.addEventListener('click',agregarAlCarrito)
function agregarAlCarrito(e){
    
    const button =e.target;
    let nombre= button.parentElement.querySelector('.nombre').textContent;
    let precio= button.parentElement.querySelector('.precio').textContent;
    let imagen = button.parentElement.parentElement.querySelector('img').src;
    let cantidad=1;
    let producto={
        nombre:nombre,
        imagen:imagen,
        precio:parseInt(precio),
        cantidad:cantidad
    } 
    
    /* some es para array de objeto y map para un array comun */
    const existe = carrito.some(i => i.nombre === producto.nombre);

    
    if(existe){
        /* si la condicion se cumple busca lo que se repite y le suma la cantidad */
        carrito.forEach(i =>{
            if(i.nombre === producto.nombre){
                i.cantidad++;
            }
        })
        /* carrito.map( i =>{
            if(i.nombre === producto.nombre){
                i.cantidad++;
            }
        }) */
    }
    else{
        carrito.push(producto)
    }

    
    escribirDatosCarrito(carrito)
    animacionButton(button)
    calcularTotalUnidadesCarrito(carrito)
} 

function calcularTotalUnidadesCarrito(carrito){
    let cantidadcarrito=0;
    for (let i = 0; i < carrito.length; i++) {
        cantidadcarrito+=carrito[i].cantidad;
    }
   
    animacionCarrito(cantidadcarrito);
}


/* animacion cuando se añade algo al carrito */

const carritohtml = document.getElementById('iconcarrito');
const iconcarrito = document.querySelector('.cantidadcart');
const circlecarrito = document.getElementById('circle')
function animacionCarrito(cantidadcarrito){
    /* backgroun cart */
    if(cantidadcarrito >= 1){
        circlecarrito.classList.remove('circle');
        circlecarrito.classList.add('circleanimate');
        carritohtml.classList.remove('cart');
        carritohtml.classList.add('cartañadido');
        
    }else{
        circlecarrito.classList.remove('circleanimate');
        circlecarrito.classList.add('circle');
        carritohtml.classList.remove('cartañadido');
        carritohtml.classList.add('cart');
    }
    
    /* circle animacion */
   
     /* escribir cantidad en el icon carrito */
     iconcarrito.textContent=cantidadcarrito;

}

/* animacion boton cart al hacer click*/
function animacionButton(e){
    /* no esta hecha aun */
}
/* calcular totalcarrito */
function calcularTotalCarrito(carrito){
    let totalcarrito =0;
    for (let i = 0; i < carrito.length; i++) {
        totalcarrito+=carrito[i].precio * carrito[i].cantidad;
       
    }
    return totalcarrito
}

/* escribir datos en carrito */
const carritomain = document.querySelector('.carritomain');
function escribirDatosCarrito(carrito){
    carritomain.innerHTML='';
   for (let i = 0; i < carrito.length; i++) {
       carritomain.innerHTML+=`
       
            <div class="cardcarrito container">
                    <img src="${carrito[i].imagen}" class="img_card__carrito" alt="">
                    <div class="infocard_carrito">
                        <span class="totalproducto">$${carrito[i].precio * carrito[i].cantidad}</span>
                        <h3 class="nombre__carrito">${carrito[i].nombre}</h3>
                    </div>
                    <div class="cantidad__botones">
                        <img class="restarcantidad" data-id='${carrito[i].nombre}' src="img/restar__cantidad.svg" alt="restarcantidadproducto">
                        <span class="cantidadproducto">${carrito[i].cantidad}</span>
                        <img class="sumarcantidad" data-id='${carrito[i].nombre}' src="./img/sumar__cantidad.svg" alt="sumarcantidadproducto">
                    </div>
                    <img class="eliminarproducto" id="${carrito[i].nombre}" src="img/icon__delete.svg" alt="eliminarproductodelcarrito">
            </div>
           
            
        
       `
   }
   carritomain.innerHTML+=`
   <div class="totalcarritocontainer">
   <span>Total</span>
   <span class='totalcarrito'>$${calcularTotalCarrito(carrito)}</span>
   </div>
   <button class='button__comprar' >Continuar compra</button>`;
}


/* abrir carrito */
carritohtml.addEventListener('click',abrirCarrito);
function abrirCarrito(){
    carritomain.classList.toggle('carritoabierto');
    body.classList.toggle('filtro')
}


/* function escribir carro vacio */
function escribirCarroVacio(){
    if(carrito.length == 0){
        carritomain.innerHTML = `
        <div class="carritovacio">
        <h2>Tu carrito esta vacio</h2>
        <img src="img/cartvacio__llorando.svg" alt="">
        <span>Aprovecha y adquiere productos de calidad</span>
        <a class="button" href="productos.html">Explorar</a>
        </div>`
        animacionCarrito() 
    }
    }


/* detactar botones y llamar funciones a partir del carrito*/
let botonescarrito = document.querySelector('.carritomain');
botonescarrito.addEventListener('click',funcionesBotonesCarrito);
   
function funcionesBotonesCarrito(e){
    if(e.target.classList.contains('eliminarproducto')){
        eliminarproducto(e);
    }
    
    if(e.target.classList.contains('restarcantidad')){
        bajarCantidadProducto(e);
    }
    if(e.target.classList.contains('sumarcantidad')){
        subirCantidadProducto(e);
    }
}


/* funciones eliminar producto del carrito */
function eliminarproducto(e){
        for (let i = 0; i < carrito.length; i++) {
            if(e.target.id == carrito[i].nombre){
                carrito.splice(i,1);
                escribirDatosCarrito(carrito)
                iconcarrito.textContent=carrito.length;

            }
        
            
        }  
        escribirCarroVacio()
}  


/* function para bajar cantidad de productos */
function bajarCantidadProducto(e){
   for (let i = 0; i < carrito.length; i++) {
       if(e.target.dataset.id == carrito[i].nombre && carrito[i].cantidad >0){
       carrito[i].cantidad--;
       escribirDatosCarrito(carrito);
       
       } 

       if( carrito[i].cantidad ===0){
        carrito.splice(i,1);
        escribirDatosCarrito(carrito);
        escribirCarroVacio()
        iconcarrito.textContent=carrito.length;
       }
       
   }
}  


/* function para bajar cantidad de productos */
function subirCantidadProducto(e){
    for (let i = 0; i < carrito.length; i++) {
        if(e.target.dataset.id == carrito[i].nombre && carrito[i].cantidad >0){
        carrito[i].cantidad++;
        escribirDatosCarrito(carrito);
        } 
    }
 }  

