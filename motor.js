import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  child,
  push,
  update,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const firebaseConfig = {
  databaseURL:
    "https://mensajeria-js-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.querySelector("#bEnviar").onclick = function () {
  if (id === null) {
    alertify.alert("Error", "Primero debe identificarse.");
  } else {
    console.log("Enviado mensaje...");
    const texto = document.querySelector("#mensaje").value;
    document.querySelector("#mensaje").value = "";
    enviarTexto(texto, id);
  }
};

function enviarTexto(texto, emisor, receptor = "EVERYBODY") {
  console.log(id + " está enviando el mensaje: " + texto);

  const newKey = push(child(ref(database), "mensajes")).key;
  const data = {};
  data[newKey] = {
    emisor: emisor,
    receptor: receptor,
    texto: `${texto}`,
    fecha: new Date(),
  };
  // No estoy seguro de que el texto se mande así

  update(ref(database), data);
}
// Suscripción a la rama de mensajes
const mensajes = ref(database, "/");

onValue(mensajes, (snapshot) => {
  let divMensajes = document.querySelector("#mensajes");
  divMensajes.innerHTML = ""; // Limpiamos el contenido existente

  snapshot.forEach((element) => {
    let mensajeElement = document.createElement("div");
    let emisor = element.val().emisor;

    mensajeElement.classList.add("message-container");

    // Creamos elementos para el emisor y el texto del mensaje
    let emisorElement = document.createElement("span");
    emisorElement.classList.add("sender-name");
    emisorElement.textContent = emisor + ": ";

    let textoElement = document.createElement("span");
    textoElement.textContent = element.val().texto;

    // Agregamos los elementos al mensaje
    mensajeElement.appendChild(emisorElement);
    mensajeElement.appendChild(textoElement);

    // Verificamos si el emisor es el mismo que el id actual
    if (emisor === id) {
      mensajeElement.classList.add("derecha");
    } else {
      mensajeElement.classList.add("izquierda");
    }

    // Agregamos el mensaje al contenedor de mensajes
    divMensajes.appendChild(mensajeElement);
  });
});

//CODIGO DE PRUEBA NO CONSEGUIDO
/*
onValue(mensajes, (snapshot) => {

  
    let contenedor = document.querySelector("#mensajes");

    const data = snapshot.forEach(element => {

        let divMensaje = document.createElement("div");
       
        if (element.val().emisor===id){
            divMensaje.setAttribute("class","msg-right");
        } else {
            divMensaje.setAttribute("class","msg-left");
        }
        
        let newMensajes = document.createTextNode(`${element.val().emisor}: ${element.val().texto}`);
        divMensaje.appendChild(newMensajes)
        contenedor.appendChild(divMensaje);
     

    });

});
*/
