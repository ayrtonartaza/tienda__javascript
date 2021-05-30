const resumenhtml = document.querySelector('#productos');
let compracarrito = JSON.parse(localStorage.getItem('datos'));
const totalhtml = document.querySelector('#totalcompranumero')
let totalcarrito= 0;
/* definiendo el total */
for (let i = 0; i < compracarrito.length; i++) {
  totalcarrito+=compracarrito[i].precio * compracarrito[i].cantidad;
}
totalhtml.textContent=totalcarrito;
compracarrito.map(i=>{
   resumenhtml.innerHTML+=`
   <div id="productos--resumen--compra">
          <div class="card">
            <img src=${i.imagen} alt="" />
              <div class="info--resumen">
                <span>${i.nombre}</span>
                <span>Cantidad : ${i.cantidad}</span>
                <span>Precio: ${i.precio}</span>
              </div>
            <span id="total">Total : ${i.precio * i.cantidad}</span>
          </div>
        </div>
  `
})