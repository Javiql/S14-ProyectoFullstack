export function getOpcionesCargo() {
  fetch("http://localhost:3000/cargos")
    .then((res) => res.json())
    .then((cargos) => {
      let opcionesCargo = "";
      cargos.forEach((cargo) => {
        let { descripcion } = cargo;
        opcionesCargo += `<option >${descripcion}</option>`;
      });
      document.getElementById("combo-cargos").innerHTML += opcionesCargo;
    });
}
export function getOpcionesDepartamento() {
  fetch("http://localhost:3000/departamentos")
    .then((res) => res.json())
    .then((departamentos) => {
      //console.log("departamentos", departamentos);
      let opcionesDepartamento = "";
      departamentos.forEach((departamento) => {
        let { descripcion } = departamento;
        opcionesDepartamento += `<option>${descripcion}</option>`;
      });
      document.getElementById("combo-departamentos").innerHTML +=
        opcionesDepartamento;
    })
    .catch((err) => {
      console.log(err);
    });
}
