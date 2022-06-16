const form = document.querySelector("#formulario");
form.addEventListener("submit", (e) => handleSubmit(e));

const seccionIzquierda = document.querySelector(".inicioJuego");
const contenedorFormulario = document.querySelector(".contenedorFormulario");

const crearMensajeSaludo = (cliente) => {

    const mensaje = document.createElement("div");

    mensaje.classList.add(
        "saludar"
    );

    mensaje.innerHTML = `

            <h3>¡ Hola ${cliente.nombre} ${cliente.apellido},<br> Bienvenido a nuestro simulador de precios !</h3>

`;
    seccionIzquierda.append(mensaje);
    console.log(seccionIzquierda);

    contenedorFormulario.textContent = "";


    const contenedorTarjetas = document.createElement('div');

    contenedorTarjetas.classList.add(
        "contenedorTarjetas"
    );

    for (let servicio of servicios) {

        contenedorTarjetas.innerHTML += `
        
        <section class="tarjetasInterior sombraClara">
            <div class="tituloTarjeta ">
                <h3> Render ${servicio.nombre}</h3>
            </div>

            <div class="contenidoTarjeta">
                <h4>Estático</h4>
                <h4>Panorámico</h4 </div>
            </div>

            <p>Paquete total: ${servicio.precio}</p>

            <button class="botonAgregar" id="boton-${servicio.id}"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M5 12l5 5l10 -10" />
          </svg></button>
        </section>  
                   
        `;

        contenedorFormulario.append(contenedorTarjetas);
    }
    const botonCalculos = document.createElement('div');
    botonCalculos.classList.add("botonParaCalcular");
    botonCalculos.innerHTML += `
    <button class="calcularPrecio">siguiente</button>
    `;
    contenedorFormulario.append(botonCalculos);
    botonCalculos.onclick = () => calcularPrecio();
    //eventos para estos botones de agregar

    servicios.forEach(servicio => {

        const btn = document.getElementById(`boton-${servicio.id}`);
        btn.addEventListener('click', function () {
            desactivarBoton(btn);
            agregarRenderALista(servicio);

        });
    })
}

function agregarRenderALista(servicio) {
    listaRenders.push(servicio);
    sessionStorage.setItem("carrito", JSON.stringify(listaRenders));
    console.log(servicio);
    imprimirCompras(servicio);
    console.log(listaRenders);
}

function imprimirCompras(servicio) {
    const crearTarjeta = document.createElement('section');

    crearTarjeta.classList.add(
        'tarjetaAgregada',
        servicio.id
    )
    crearTarjeta.innerHTML += `
        <h4> ${servicio.nombre}</h4>
        <div class="contenedorTarjetaAgregada">
        <p>Valor: $${servicio.precio}</p>
        <button class="eliminarTarjeta" id="btn-eliminar-${servicio.id}"><svg xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
        </svg></button>
        </div>
        `;
    seccionIzquierda.append(crearTarjeta);

    listaRenders.forEach(servicio => {
        document.getElementById(`btn-eliminar-${servicio.id}`).addEventListener('click', function () {
            eliminarRenderDeLista(servicio.id);
        });
    })

}

function eliminarRenderDeLista(id) {
    const index = listaRenders.findIndex((servicio) => servicio.id === id);
    listaRenders.splice(index, 1);

    /* const fede = document.getElementsByClassName(id);
    console.log(fede);
    seccionIzquierda.removeChild(fede); */


    const btn = document.getElementById(`boton-${id}`);
    activarBoton(btn);
    console.log(listaRenders);

}

function desactivarBoton(btn) {
    btn.disabled = true;
}

function activarBoton(btn) {
    btn.disabled = false;
}

let precio = 0;
function calcularPrecio() {

    listaRenders.forEach((render) => {
        precio += render.precio;
    })

    const crearTarjeta = document.createElement('section');

    crearTarjeta.classList.add(
        'tarjetaAgregada'
    )
    crearTarjeta.innerHTML += `
        <h4> precio total </h4>
        <div class="contenedorTarjetaAgregada">
        <p>Valor: $${precio}</p>
        </div>
        `;
    const botonJugar = document.createElement('div');
    botonJugar.classList.add(
        'contenedorBotonJuego',
    );

    botonJugar.innerHTML += `
     <button class="botonJugar" onclick="(presentacionDeJuego())">Jugar por descuentos</button>
     `;

    seccionIzquierda.append(crearTarjeta);
    seccionIzquierda.append(botonJugar);

    const btnSiguiente = document.querySelector(".calcularPrecio");
    desactivarBoton(btnSiguiente);
}

function presentacionDeJuego() {
    contenedorFormulario.textContent = "";

    const tableroMemorama = document.createElement('section');
    tableroMemorama.classList.add('memorama');

    tableroMemorama.innerHTML += `
    
    <div class="rectanguloMemorama sombraClara">
            <div><button></button></div>
            <div><button></button></div>
            <div><button></button></div>
            <div><button></button></div>
            <div><button></button></div>
            <div><button></button></div>
            <div><button></button></div>
            <div><button></button></div>
            <div><button></button></div>
            <div><button></button></div>
            <div><button></button></div>
            <div><button></button></div>
        </div>

        <div class="calculosJuego">

        </div>
    
    `

    contenedorFormulario.appendChild(tableroMemorama);

}
