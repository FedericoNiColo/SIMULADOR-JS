let listaRenders = [];

if (localStorage.getItem("carrito") != null) {
  carrito = JSON.parse(localStorage.getItem("carrito"));

  for (const iterator of listaRenders) {
    imprimirCompras(iterator);
  }
}

const handleSubmit = (e) => {
  e.preventDefault();
  console.dir(e.target);

  let nombre = e.target[0].value;
  let apellido = e.target[1].value;
  let email = e.target[2].value;

  const cliente = new Cliente(nombre, apellido, email);
  localStorage.setItem("nombre", nombre);
  localStorage.setItem("apellido", apellido);
  alertaDeConfirmacion();
  crearMensajeSaludo(cliente);
  /* cliente = new Render(); */
  /* listarRenders(cliente.servicios); */
  /*   reconocerId(); */
}

function alertaDeConfirmacion() {
  Swal.fire({
    position: 'top-end',
    width: '25%',
    icon: 'success',
    background: 'rgba(12, 11, 11);',
    showConfirmButton: false,
    timer: 1300
  })
}

function desactivarBoton(btn) {
  btn.disabled = true;
}

function activarBoton(btn) {
  btn.disabled = false;
}
