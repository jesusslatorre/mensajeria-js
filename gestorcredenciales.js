const ID_USER = "mensajeria.id";

//INTENTAR RECUPERAR EL ID

var id = localStorage.getItem(ID_USER);

if (id != null) {
  document.querySelector("#identificador").value = id;
  document.querySelector("#bLogin").style.display = "none";
}

document.querySelector("#bLogin").onclick = () => {
  if (document.querySelector("#identificador").value === "") {
    alertify.alert("Error", "Identificador vacío.");
  } else {
    alertify.alert("Perfecto", "LogIn correcto.");
    console.log("Guardando crendenciales...");
    localStorage.setItem(
      ID_USER,
      document.querySelector("#identificador").value
    );
    id = document.querySelector("#identificador").value;
  }
};
