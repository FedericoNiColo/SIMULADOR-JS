let listaRenders = [];
let nombre = "";
let apellido = "";
let email = "";

const handleSubmit = (e) => {
  e.preventDefault();
  console.dir(e.target);

  nombre = e.target[0].value;
  apellido = e.target[1].value;
  email = e.target[2].value;

  const cliente = new Cliente(nombre, apellido, email);
  alertaDeConfirmacion();
  crearMensajeSaludo(cliente);
}


function alertaDeConfirmacion() {
  Swal.fire({
    position: 'top-end',
    width: '25%',
    icon: 'success',
    background: 'rgba(12, 11, 11);',
    showConfirmButton: false,
    timer: 1200
  })
}

function desactivarBoton(btn) {
  btn.disabled = true;
}

function activarBoton(btn) {
  btn.disabled = false;
}

//Juego Memorama


//Variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => { return Math.random() - 0.5 });
console.log(numeros);

//documento HTML


function girar(id) {

  if (temporizador == false) {
    contarTiempo();
    temporizador = true;
  }

  tarjetasDestapadas++;
  console.log(tarjetasDestapadas);

  if (tarjetasDestapadas == 1) {

    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = `${primerResultado}`;              /* `<img src="../imagenes/${primerResultado}.jpg" alt="imgen">`; */
    tarjeta1.disabled = true;
  } else if (tarjetasDestapadas == 2) {

    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = `${segundoResultado}`  /* `<img src="../imagenes/${segundoResultado}.jpg" alt="imgen">`; */
    tarjeta2.disabled = true;

    if (primerResultado == segundoResultado) {

      tarjetasDestapadas = 0;
      aciertos++;

      const mostrarAciertos = document.querySelector("#aciertos");
      mostrarAciertos.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-check" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 12l2 2l4 -4" />
      </svg> ${aciertos}
      `

      if (aciertos == 8) {
        mostrarAciertos.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-check" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 12l2 2l4 -4" />
      </svg> ${aciertos}
        `
      }

    } else {
      setTimeout(() => {
        tarjeta1.innerHTML = ' ';
        tarjeta2.innerHTML = ' ';
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      }, 800)
    }
  }

}

function contarTiempo() {

  let tiempoRegresivo = null;

  let tiempoRestante = document.querySelector("#tiempo");

  tiempoRegresivo = setInterval(() => {
    timer--;
    tiempoRestante.innerHTML = `
    
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 15 15" />
              </svg> ${timer}
    
              `

    if (aciertos == 8) {
      clearInterval(tiempoRegresivo);
      tiempoRestante.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 15" />
      </svg> ${timer}`;

      bloquearTarjetas();

      setTimeout(() => {

        juegoTerminado("ganado");
      }, 5000)
      /*  resumenFinal(); */
    }

    if (timer == 0 && aciertos != 8) {

      clearInterval(tiempoRegresivo);
      tiempoRestante.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 15" />
      </svg> ${timer}`;

      bloquearTarjetas();

      setTimeout(() => {

        juegoTerminado("perdido");
      }, 5000)
    }
  }, 1000);

}

function bloquearTarjetas() {

  for (let i = 0; i <= 15; i++) {
    const tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = numeros[i];
    tarjetaBloqueada.disabled = true;

  }
}


