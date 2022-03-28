export class Cargo {
  // se ejecuta al instanciar la clea y crea los atributos con this
  constructor() {
    // this.cargos = [
    //   { id: 1, descripcion: "Analista", estado: 1 },
    //   { id: 2, descripcion: "Ingeniero", estado: 0 },
    //   { id: 3, descripcion: "Consultor", estado: 1 },
      
    // ];
    this.cargos = JSON.parse(localStorage.getItem("cargos"));
    if (this.cargos === null) this.cargos = []; 
    this.id = "";
    this.grabar = true;
  }

  obtenerCargos() {
    console.log(this.cargos);
    let filas = "";
    this.cargos.forEach((cargo) => {
      // destructuring: descomponer un objeto en sus atributos
      let { id, descripcion, estado } = cargo;
      filas += ` <tr>
        <td>${id}</td>
        <td>${descripcion}</td>
        <td>${estado ? "Activo" : "Inactivo"}</td>
        <td>
          <button type="button" class="btn btn-edit" id="btn-edit" data-id="${id}">✏️</button>
          <button type="button" class="btn btn-delete" id="btn-delete" data-id="${id}">❌</button>
        </td>
      </tr>
       `;
    });
    console.log(filas);
    document.getElementById("detalle-cargos").innerHTML = filas;
    // eliminar
    const btnsDelete = document.querySelectorAll(".btn-delete");
    console.log(btnsDelete);
    btnsDelete.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        console.log(btn.dataset.id, e.target.dataset.id);
        console.log("elimnando...");
        this.eliminarCargo(e.target.dataset.id);
      });
    });
    // editar
    const $btnsEdit = document.querySelectorAll(".btn-edit");
    $btnsEdit.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        console.log(e.target.dataset.id);
        this.id = e.target.dataset.id;
        let { descripcion, estado } = this.obtenerCargo(this.id);
        document.getElementById("descripcion").value = descripcion;
        document.getElementById("activo").checked = estado;
        document.getElementById("enviar").innerHTML = "Actualizar";
        this.grabar = false;
      });
    });
  }

  obtenerCargo(id) {
    const dato = this.cargos.find((cargo) => cargo.id == id);
    console.log(dato);
    return dato;
  }

  eliminarCargo(id) {
    this.cargos = this.cargos.filter((cargo) => cargo.id != id);
    localStorage.setItem("cargos", JSON.stringify(this.cargos));
    this.obtenerCargos();
  }
  // insertar un nuevo cargo
  insertarDatos(cargo) {
    this.cargos = [...this.cargos,cargo]
    localStorage.setItem("cargos", JSON.stringify(this.cargos));
    this.obtenerCargos()
    return true
  }
                    
  modificarDatos(cargoMod, id) {
    try{
        this.cargos = this.cargos.map((cargo) => {
          if (cargo.id == id)
             return cargoMod
         else
             return cargo    
        });
        localStorage.setItem("cargos", JSON.stringify(this.cargos));
        this.obtenerCargos();
        document.getElementById("enviar").innerHTML = "Insertar";
        this.grabar = true;

    } catch (error) {
       console.log("error: ", error);
    }
  }

  // fin de la clase cargo
}