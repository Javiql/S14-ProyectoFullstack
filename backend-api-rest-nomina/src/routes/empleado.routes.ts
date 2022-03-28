import { Router } from "express";
import { getCargo } from "../controllers/cargo.controller";
import { getDepartamentos } from "../controllers/departamento.controllers";
import {getEmpleados, createEmpleado, getEmpleado, deleteEmpleado, updateEmpleado} from "../controllers/empleado.controller"

const router = Router();
router.route("/").get(getEmpleados).post(createEmpleado).get(getCargo).get(getDepartamentos)

router.route("/:empleadoId").get(getEmpleado).delete(deleteEmpleado).put(updateEmpleado);


export default router;