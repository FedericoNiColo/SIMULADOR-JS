const form = document.querySelector("#formulario");
form.addEventListener("submit", (e) => handleSubmit(e));

const seccionIzquierda = document.querySelector(".inicioJuego");
const contenedorCartasCompradas = document.querySelector("#contenedorCartas");
const contenedorFormulario = document.querySelector(".contenedorFormulario");

const crearMensajeSaludo = (cliente) => {

    const contenedorSaludo = document.querySelector("#contenedorSaludo");
    const mensaje = document.createElement("h3");

    contenedorSaludo.classList.add(
        "saludar"
    );

    mensaje.innerHTML = `

            ¡ Hola ${cliente.nombre} ${cliente.apellido},<br> Bienvenido a nuestro simulador de precios !

`;
    contenedorSaludo.append(mensaje);
    console.log(seccionIzquierda);

    contenedorFormulario.textContent = "";

    paquetesDeCompras();
}


const paquetesDeCompras = () => {

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
    <button class="borrarTodo" onclick="eliminarRenderDeLista()">Borrar Todo</button>
    <button class="calcularPrecio" onclick="calcularPrecio()">siguiente</button>
    `;
    contenedorFormulario.append(botonCalculos);
    //eventos para estos botones de agregar

    servicios.forEach(servicio => {

        const btn = document.getElementById(`boton-${servicio.id}`);
        btn.addEventListener('click', function () {
            /* desactivarBoton(btn); */
            agregarRenderALista(servicio);

        });
    })
}


function agregarRenderALista(servicio) {
    listaRenders.push(servicio);
    sessionStorage.setItem("carrito", JSON.stringify(listaRenders));
    imprimirCompras(servicio);
    console.log(listaRenders);
    alertaDeConfirmacion();
}

function imprimirCompras(servicio) {

    const crearTarjeta = document.createElement('section');

    crearTarjeta.classList.add(
        'tarjetaAgregada',
        'eliminar'
    )
    crearTarjeta.innerHTML += `
        <h4> ${servicio.nombre}</h4>
        <div class="contenedorTarjetaAgregada">
        <p>Valor: $${servicio.precio}</p>
        </div>
        `;
    contenedorCartasCompradas.append(crearTarjeta);

}


function calcularPrecio() {
    let precio = 0;

    listaRenders.forEach((render) => {
        precio += render.precio;
    })

    const crearTarjeta = document.createElement('section');

    crearTarjeta.classList.add(
        'tarjetaAgregada',
        'eliminar'
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
        'eliminar'
    );

    botonJugar.innerHTML += `
        <button class="botonJugar" onclick="(presentacionDeJuego())">Jugar por descuentos</button>
        `;

    const btnSiguiente = document.querySelector(".calcularPrecio");
    desactivarBoton(btnSiguiente);

    contenedorCartasCompradas.append(crearTarjeta);
    contenedorCartasCompradas.append(botonJugar);
}

function eliminarRenderDeLista() {

    const eliminarTarjetas = document.querySelectorAll('.eliminar');
    console.log(eliminarTarjetas);

    eliminarTarjetas.forEach(tarjeta => {
        tarjeta.remove();
    })

    listaRenders = [];
    precio = 0;
    const btnSiguiente = document.querySelector(".calcularPrecio");
    activarBoton(btnSiguiente);

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
