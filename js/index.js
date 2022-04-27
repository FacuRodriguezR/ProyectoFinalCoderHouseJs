// variables
let saldo = 23500;
let botonTransferencia = document.getElementById("transferir");
let botonAdicionarDinero = document.getElementById("botonDeposito");
let botonExtraccion = document.getElementById("botonRetiro");
let botonConsulta = document.getElementById("botonSaldo");

// AGREGAMOS EVENTOS A CADA BOTON




//BOTON SALDO

botonConsulta.addEventListener("click", accionBotonSaldo);

function accionBotonSaldo() {
  Swal.fire("Tu saldo es de $" + saldo);
}
// FIN BOTON SALDO

// BOTON RETIRO DE DINERO

botonExtraccion.addEventListener("click", accionRetiro);

function accionRetiro() {
  let monto = parseFloat(prompt("Ingrese el monto a retirar"));
  if (monto > saldo) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Saldo insuficiente",
    });
  } else if (monto <= 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Ingrese un monto válido",
    });
  } else {
    saldo = retirarDinero(saldo, monto);

    Swal.fire({
      icon: "success",
      title: "Retiro de dinero exitoso",
      text: "Su nuevo saldo es de $" + saldo,
    });
  }
}

// FIN BOTON RETIRO
/* ******************************************************* */
// BOTON INGRESO DINERO

botonAdicionarDinero.addEventListener("click", accionDeposito);

// funcion accionDeposito

function accionDeposito() {
  let depositoSaldo = parseFloat(prompt("Ingrese el monto a depositar"));

    saldo = depositarDinero(saldo, depositoSaldo);


  depositoSaldo>0 ? Swal.fire({
    icon: "success",
    title: "Usted depositó $" + depositoSaldo + ".",
    text: "Su nuevo saldo es de $" + saldo,
  }) : Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Ingrese un monto válido",
  })
}

const lista = document.getElementById("botonTransf");
lista.addEventListener("click", transferenciaDinero)

function transferenciaDinero  (){
 
  let montoTransf = parseFloat(prompt("Ingrese el monto que desea transferir"));
  if(montoTransf > saldo){
   Swal.fire({
     icon: "error",
     title: "Oops...",
     text: "Saldo insuficiente",
   });
  } else if (montoTransf <= 0){
   Swal.fire({
     icon: "error",
     title: "Oops...",
     text: "Ingrese un monto válido",
   });
  } else {
   Swal.fire({
     icon: "success",
     title: "Excelente",
     text: "La transferencia fue existosa",
     
   });
  }
  saldo = transferirDinero(saldo, montoTransf);
 }
// UTILIZAMOS FETCH Y MANIPULAMOS EL DOM

fetch("/index.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((destinatario) => {
      const li = document.createElement("li");
      li.innerHTML = `
   <h4>Nombre: ${destinatario.nombre}</h4>
   <h4>CBU: ${destinatario.CBU}</h4>
   <h4>Banco: ${destinatario.banco}</h4>
   <button onclick="transferenciaDinero" id="botonTransf" class="boton btn btn-primary">Transferir Dinero</button>
   <hr>
   `;
      lista.append(li);

 
    });
  
  });


function retirarDinero(saldoActual, monto) {
  return saldoActual - monto;
}

function depositarDinero(saldoActual, monto) {
  return saldoActual + monto;
}

function transferirDinero(saldoActual, montoTransf){
  return saldoActual - montoTransf;
}