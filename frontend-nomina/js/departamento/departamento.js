import { Departamento } from "./componente.js";
// instanciamos departamento
const serDepartamento = new Departamento();
const d = document;
const $formDepartamento = d.getElementById("form-departamento");

d.addEventListener("DOMContentLoaded", serDepartamento.obtenerDepartamentos());
// delegacion de eventos
d.addEventListener("click", async (e) => {
  console.log(e.target);
  if (e.target.matches("#enviar")) {
    //alert("has hecho click")
    e.preventDefault();
    let $descrip = d.getElementById("descripcion").value;
    let $estado = d.getElementById("activo").checked;
    if ($descrip.trim().length < 3) {
      alert("Datos vacios o incompletos");
    } else {
      if (serDepartamento.grabar) {
        let id = Date.now();
        const departamento = { descripcion: $descrip, estado: $estado };
        const departamentoJson = JSON.stringify(departamento);
        const res = await serDepartamento.insertarDatos(departamentoJson);
      } else {
        let id = serDepartamento.id;
        const departamento = { descripcion: $descrip, estado: $estado };
        const departamentoModJson = JSON.stringify(departamento);
        const res = await serDepartamento.modificarDatos(
          departamentoModJson,
          serDepartamento.id
        );
      }
      $formDepartamento.reset();
    }
  }
});
