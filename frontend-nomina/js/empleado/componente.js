import { getOpcionesCargo, getOpcionesDepartamento } from "./combo.js";

export class Empleado {
  // se ejecuta al instanciar la clea y crea los atributos con this
  constructor() {
    this.id = "";
    this.grabar = true;
    this.url = "http://localhost:3000/empleados";
    getOpcionesDepartamento();
    getOpcionesCargo();
  }

  obtenerEmpleados() {
    fetch(this.url)
      .then((res) => res.json())
      .then((empleados) => {
        let filas = "";
        empleados.forEach((empleado) => {
          // destructuring: descomponer un objeto en sus atributos
          let { id, nombre, cedula, Cargo, Departamento, sueldo, estado } =
            empleado;
          filas += `<tr>
                <td>${id}</td>
                <td>${nombre}</td>
                <td>${cedula}</td>
                <td>${Cargo}</td>
                <td>${Departamento}</td>
                <td>${sueldo}</td>
                <td>${estado ? "Activo" : "Inactivo"}</td>
                <td>
                  <button type="button" class="btn btn-edit" id="btn-edit" data-id="${id}">✏️</button>
                  <button type="button" class="btn btn-delete" id="btn-delete" data-id="${id}">❌</button>
                </td>`;
        });
        document.getElementById("detalle-empleados").innerHTML = filas;
        // eliminar

        // getOpcionesCargo();

        // getOpcionesDepartamento();

        const btnsDelete = document.querySelectorAll(".btn-delete");
        //console.log(btnsDelete);
        btnsDelete.forEach((btn) => {
          btn.addEventListener("click", async (e) => {
            console.log(btn.dataset.id, e.target.dataset.id);
            console.log("elimnando...");
            await this.eliminarEmpleado(e.target.dataset.id);
          });
        });
        // editar
        const $btnsEdit = document.querySelectorAll(".btn-edit");
        $btnsEdit.forEach((btn) => {
          btn.addEventListener("click", async (e) => {
            console.log(e.target.dataset.id);
            this.id = e.target.dataset.id;
            let { nombre, cedula, cargoid, dptoid, sueldo, estado } =
              await this.obtenerEmpleado(this.id);
            document.getElementById("nombre").value = nombre;
            document.getElementById("cedula").value = cedula;
            document.getElementById("combo-cargos").value = cargoid;
            document.getElementById("combo-departamentos").value = dptoid;
            document.getElementById("sueldo").value = sueldo;
            document.getElementById("activo").checked = estado;
            document.getElementById("enviar").innerHTML = "Actualizar";
            this.grabar = false;
          });
        });
      })
      .catch((err) => console.log("error:=>", err));
  }

  async obtenerEmpleado(id) {
    const res = await fetch(`${this.url}/${id}`);
    const dato = await res.json();
    console.log(dato[0]);
    return dato[0];
  }

  async eliminarEmpleado(id) {
    const res = await fetch(`${this.url}/${id}`, { method: "delete" });
    this.obtenerEmpleados();
  }
  // insertar un nuevo cargo
  async insertarDatos(empleado) {
    const res = await fetch(this.url, { method: "post", body: empleado });
    console.log(res);
    this.obtenerEmpleados();
    return true;
  }

  async modificarDatos(empleadoMod, id) {
    try {
      const res = await fetch(`${this.url}/${id}`, {
        method: "put",
        body: empleadoMod,
      });
      this.obtenerEmpleados();
      document.getElementById("enviar").innerHTML = "Insertar";
      this.grabar = true;
    } catch (error) {
      console.log("error: ", error);
    }
  }

  // fin de la clase cargo
}
