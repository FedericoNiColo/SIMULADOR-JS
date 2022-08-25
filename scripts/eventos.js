//Comienzo 
const form = document.querySelector("#formulario");
form.addEventListener("submit", (e) => handleSubmit(e));

//variables
let paquetes = [];

//Elementos HTML
const body = document.querySelector('#simulador');
const seccionIzquierda = document.querySelector(".inicioJuego");
const contenedorCartasCompradas = document.querySelector("#contenedorCartas");
const contenedorFormulario = document.querySelector(".contenedorFormulario");
const contenedorSaludo = document.querySelector("#contenedorSaludo");
const contenedorCartas = document.querySelector("#contenedorCartas");


//funciones
const crearMensajeSaludo = (cliente) => {

    const contenedorSaludo = document.querySelector("#contenedorSaludo");
    const mensaje = document.createElement("h3");

    contenedorSaludo.classList.add(
        "saludar",
        "animate__animated",
        "animate__slideInLeft"

    );

    mensaje.innerHTML = `

            ¡ Hola ${cliente.nombre} ${cliente.apellido},<br> Bienvenido a nuestro simulador de precios !

`;
    contenedorSaludo.append(mensaje);
    console.log(seccionIzquierda);

    setTimeout(() => {

        contenedorFormulario.textContent = "";

        paquetesDeCompras();
    }, 1200)
}


const paquetesDeCompras = () => {

    const contenedorTarjetas = document.createElement('div');

    contenedorTarjetas.classList.add(
        "contenedorTarjetas",
        "animate__animated",
        "animate__slideInRight"
    );

    const URLJSON = "/servicios.json";

    fetch(URLJSON)
        .then((respuesta) => respuesta.json())
        .then((data) => {
            paquetes = data.servicios;

            for (let paquete of paquetes) {

                contenedorTarjetas.innerHTML += `
                
                <section class="tarjetasInterior sombraClara">
                    <div class="tituloTarjeta ${paquete.nombre}">
                        <h3> Render ${paquete.nombre}</h3>
                    </div>
        
                    <div class="contenidoTarjeta">
                        <h4>Estático</h4>
                        <h4>Panorámico</h4 </div>
                    </div>
        
                    <p>Paquete total: ${paquete.precio}</p>

                    <button class="botonAgregar" id="boton-${paquete.id}"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M5 12l5 5l10 -10" />
                  </svg></button>
                </section>  
                           
                `;

                contenedorFormulario.append(contenedorTarjetas);
            }

            const botonCalculos = document.createElement('div');
            botonCalculos.classList.add(
                "botonParaCalcular",
                "animate__animated",
                "animate__zoomIn"
            );
            botonCalculos.innerHTML += `
            <button class="borrarTodo" onclick="eliminarRenderDeLista()">Borrar Todo</button>
            <button class="calcularPrecio" onclick="calcularPrecio()">siguiente</button>
            `;
            contenedorFormulario.append(botonCalculos);
            //eventos para estos botones de agregar

            paquetes.forEach(servicio => {
                const servicioo = servicio;
                const btn = document.getElementById(`boton-${servicio.id}`);
                btn.addEventListener('click', function () {
                    if (listaRenders.includes(servicioo)) {
                        alertaDeConfirmacion();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Paquete ya agregado',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    } else {
                        agregarRenderALista(servicio);
                    }

                });
            })
        })
}

let contador = null;

function agregarRenderALista(servicio) {
    listaRenders.push(servicio);
    imprimirCompras(servicio);
    console.log(listaRenders);
}


function imprimirCompras(servicio) {

    const crearTarjeta = document.createElement('section');

    crearTarjeta.classList.add(
        'tarjetaAgregada',
        'eliminar',
        "animate__animated",
        "animate__zoomIn"
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
        'eliminar',
        "animate__animated",
        "animate__zoomIn"
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

    paquetes.forEach(servicio => {

        const btn = document.getElementById(`boton-${servicio.id}`);
        activarBoton(btn);

    });

}

function presentacionDeJuego() {

    
    const btnJugar = document.querySelector('.botonJugar');
    desactivarBoton(btnJugar);
    contenedorFormulario.textContent = "";
    
    contenedorSaludo.remove();
    contenedorCartas.remove();
    //mensaje en la parte izquierda 
    const contenedorMensajeJuego = document.querySelector("#contenedorMensajeJuego");
    const mensajeJuego = document.createElement("h3");

    contenedorMensajeJuego.classList.add(
        "saludar",
        "animate__animated",
        "animate__slideInLeft"

    );

    mensajeJuego.innerHTML = `

            ¡ Juego de memoria,<br> junta las duplas de renders !

`;
    contenedorMensajeJuego.append(mensajeJuego);
    console.log(seccionIzquierda);

    //Se imprime el tablero del juego  
    const tableroMemorama = document.createElement('section');
    tableroMemorama.classList.add(
        'memorama',
        "animate__animated",
        "animate__slideInRight"
    );

    tableroMemorama.innerHTML += `
    
    <div class="rectanguloMemorama ">
            <div class="sombraClaraBlanca"><button id="0" onclick="girar(0)"></button></div>
            <div class="sombraClaraBlanca"><button id="1" onclick="girar(1)"></button></div>
            <div class="sombraClaraBlanca"><button id="2" onclick="girar(2)"></button></div>
            <div class="sombraClaraBlanca"><button id="3" onclick="girar(3)"></button></div>
            <div class="sombraClaraBlanca"><button id="4" onclick="girar(4)"></button></div>
            <div class="sombraClaraBlanca"><button id="5" onclick="girar(5)"></button></div>
            <div class="sombraClaraBlanca"><button id="6" onclick="girar(6)"></button></div>
            <div class="sombraClaraBlanca"><button id="7" onclick="girar(7)"></button></div>
            <div class="sombraClaraBlanca"><button id="8" onclick="girar(8)"></button></div>
            <div class="sombraClaraBlanca"><button id="9" onclick="girar(9)"></button></div>
            <div class="sombraClaraBlanca"><button id="10" onclick="girar(10)"></button></div>
            <div class="sombraClaraBlanca"><button id="11" onclick="girar(11)"></button></div>
            <div class="sombraClaraBlanca"><button id="12" onclick="girar(12)"></button></div>
            <div class="sombraClaraBlanca"><button id="13" onclick="girar(13)"></button></div>
            <div class="sombraClaraBlanca"><button id="14" onclick="girar(14)"></button></div>
            <div class="sombraClaraBlanca"><button id="15" onclick="girar(15)"></button></div>
        </div>

        <div class="calculosJuego">
            <div>
                <h2 id="aciertos" class="estadisticas"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-check" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M9 12l2 2l4 -4" />
              </svg> 0</h2>
            </div>
            <div>
                <h2 id="tiempo" class="estadisticas"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 15 15" />
              </svg> 60</h2>
            </div>
        </div>

    `
    contenedorFormulario.appendChild(tableroMemorama);

}

function juegoTerminado(condicion) {

    seccionIzquierda.remove();
    contenedorFormulario.remove();

    const resumenFinal = document.querySelector('#resumen');

    resumenFinal.classList.add(
        'resumenFinal',
        "animate__animated",
        "animate__slideInDown")

    const contenidoResumen = document.createElement('div');

    switch (condicion) {
        case "perdido":
            contenidoResumen.innerHTML += `
    
            <div class="contenidoResumen sombraRoja">
                <img src="/imagenes/LOGOBLANCO.png" alt="imagenlogo" href="./index.html">
                <h2>¡ Muchas gracias ${nombre} ${apellido} ! </h2>
                <p>En instantes llegará al mail ${email} el resumen de compra con el costo total<p>
            </div>
        
        `
            break;

        case "ganado":

            contenidoResumen.innerHTML += `
    
            <div class="contenidoResumen sombraVerde">
                <img src="/imagenes/LOGOBLANCO.png" alt="imagenlogo" href="./index.html">
                <h2>¡ Muchas gracias ${nombre} ${apellido} ! </h2>
                <p>En instantes llegará al mail ${email} el resumen de compra con el código de descuento ganado
                    en el juego<p>
            </div>
        
        `
            break;
    }

    resumenFinal.appendChild(contenidoResumen);
    body.append(resumenFinal);
}
