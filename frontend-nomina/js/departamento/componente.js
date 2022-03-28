export class Departamento {
  // se ejecuta al instanciar la clea y crea los atributos con this
  constructor() {
    this.id = "";
    this.grabar = true;
    this.url = "http://localhost:3000/departamentos";
  }

  obtenerDepartamentos() {
    fetch(this.url)
      .then((res) => res.json())
      .then((departamentos) => {
        console.log(departamentos);
        let filas = "";
        departamentos.forEach((departamento) => {
          // destructuring: descomponer un objeto en sus atributos
          let { id, descripcion, estado } = departamento;
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
        //console.log(filas);
        document.getElementById("detalle-departamentos").innerHTML = filas;
        // eliminar
        const btnsDelete = document.querySelectorAll(".btn-delete");
        //console.log(btnsDelete);
        btnsDelete.forEach((btn) => {
          btn.addEventListener("click", async (e) => {
            console.log(btn.dataset.id, e.target.dataset.id);
            console.log("elimnando...");
            await this.eliminarDepartamento(e.target.dataset.id);
          });
        });
        // editar
        const $btnsEdit = document.querySelectorAll(".btn-edit");
        $btnsEdit.forEach((btn) => {
          btn.addEventListener("click", async (e) => {
            console.log(e.target.dataset.id);
            this.id = e.target.dataset.id;
            let { descripcion, estado } = await this.obtenerDepartamento(
              this.id
            );
            document.getElementById("descripcion").value = descripcion;
            document.getElementById("activo").checked = estado;
            document.getElementById("enviar").innerHTML = "Actualizar";
            this.grabar = false;
          });
        });
      })
      .catch((err) => console.log("error:=>", err));
  }

  async obtenerDepartamento(id) {
    const res = await fetch(`${this.url}/${id}`);
    const dato = await res.json();
    console.log(dato[0]);
    return dato[0];
  }

  async eliminarDepartamento(id) {
    const res = await fetch(`${this.url}/${id}`, { method: "delete" });
    this.obtenerDepartamentos();
  }
  // insertar un nuevo cargo
  async insertarDatos(departamento) {
    console.log({ body: departamento });
    const res = await fetch(this.url, { method: "post", body: departamento });
    console.log(res);
    this.obtenerDepartamentos();
    return true;
  }

  async modificarDatos(departamentoMod, id) {
    try {
      const res = await fetch(`${this.url}/${id}`, {
        method: "put",
        body: departamentoMod,
      });
      this.obtenerDepartamentos();
      document.getElementById("enviar").innerHTML = "Insertar";
      this.grabar = true;
    } catch (error) {
      console.log("error: ", error);
    }
  }

  // fin de la clase departamento
}
