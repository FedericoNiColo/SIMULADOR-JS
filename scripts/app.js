let listaRenders = [];

if (sessionStorage.getItem("carrito") != null) {
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
  sessionStorage.setItem("nombre", nombre);
  sessionStorage.setItem("apellido", apellido);
  crearMensajeSaludo(cliente);
  /* cliente = new Render(); */
  /* listarRenders(cliente.servicios); */
  /*   reconocerId(); */
}

