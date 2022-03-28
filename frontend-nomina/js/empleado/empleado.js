import { Empleado } from "./componente.js";
// instanciamos cargo
const serEmpleado = new Empleado();
const d = document;
const $formEmpleado = d.getElementById("form-empleado");

d.addEventListener("DOMContentLoaded", serEmpleado.obtenerEmpleados());
// delegacion de eventos
d.addEventListener("click", async (e) => {
  console.log(e.target);
  if (e.target.matches("#enviar")) {
    //alert("has hecho click")
    e.preventDefault();
    let $nombre = d.getElementById("nombre").value;
    let $cedula = d.getElementById("cedula").value;
    let $Cargo = d.getElementById("combo-cargos").value;
    let $Departamento = d.getElementById("combo-departamentos").value;
    let $sueldo = d.getElementById("sueldo").value;
    let $estado = d.getElementById("activo").checked;
    if ($nombre.trim().length < 3) {
      alert("Datos vacios o incompletos");
    
    }else if(!$cedula){
      alert("Digite un numero valido!")
    } else if (isNaN($cedula)) {
      alert("Solo se permite numeros!")
    }else if ($cedula.length > 10 ){
    alert("Solo se permite un maximo de 10 digitos")
    }else if (!$sueldo) {
      alert("Ingrese un sueldo valido ejemplo: 15.30 o 15")
    }else if($sueldo < 5){
      alert("Ingrese un sueldo mayor o igual a 5.")
    }
    
    
    else {
      if (serEmpleado.grabar) {
        let listaCargo = await fetch("http://localhost:3000/cargos")
        .then((res) => res.json())
        let listaDepartamento = await fetch("http://localhost:3000/departamentos")
        .then((res) => res.json())
        let idCargo = listaCargo.filter(cargo => cargo.descripcion == $Cargo)[0].id  
        let idDepartamento = listaDepartamento.filter(departamento => departamento.descripcion == $Departamento)[0].id


        let id = Date.now();
        const empleado = {
          nombre: $nombre,
          cedula: $cedula,
          cargoid: idCargo,
          dptoid: idDepartamento,
          sueldo: $sueldo,
          estado: $estado,
        };
        const empleadoJson = JSON.stringify(empleado);
        const res = await serEmpleado.insertarDatos(empleadoJson);

      } 
      else {
        let listaCargo = await fetch("http://localhost:3000/cargos")
        .then((res) => res.json())
        let listaDepartamento = await fetch("http://localhost:3000/departamentos")
        .then((res) => res.json())
        let idCargo = listaCargo.filter(cargo => cargo.descripcion == $Cargo)[0].id  
        let idDepartamento = listaDepartamento.filter(departamento => departamento.descripcion == $Departamento)[0].id
        
        let id = serEmpleado.id;
        const empleado = {
          nombre: $nombre,
          cedula: $cedula,
          cargoid: idCargo,
          dptoid: idDepartamento,
          sueldo: $sueldo,
          estado: $estado,
        };
        const empleadoModJson = JSON.stringify(empleado);
        const res = await serEmpleado.modificarDatos(
          empleadoModJson,
          serEmpleado.id
        
        );
      }
      $formEmpleado.reset();
    }
  }
});
