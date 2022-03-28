// importar router
import { Router } from "express";
// importacion de controladores(funciones) de cargo
import {
  getDepartamentos,
  createDepartamento,
  getDepartamento,
  deleteDepartamento,
  updateDepartamento,
} from "../controllers/departamento.controllers";
// instanciar router - ruteador
const router = Router();
// rutas de cargos con "/"
router.route("/").get(getDepartamentos).post(createDepartamento);

// rutas de cargos con un id "/:cargoId"
router
  .route("/:departamentoId")
  .get(getDepartamento)
  .delete(deleteDepartamento)
  .put(updateDepartamento);

export default router;
