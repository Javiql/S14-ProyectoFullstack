// importar router
import { Router } from "express";
// importacion de controladores(funciones) de cargo
import { getCargos,createCargo,getCargo,deleteCargo,updateCargo } from "../controllers/cargo.controller";
// instanciar router - ruteador
const router = Router();
// rutas de cargos con "/"
router.route("/")
    .get(getCargos)
    .post(createCargo);

// rutas de cargos con un id "/:cargoId"
router.route("/:cargoId")  
    .get(getCargo)
    .delete(deleteCargo)
    .put(updateCargo)
    
    

    
export default router


// router.route("/cargo").get( async(req, res) => {
//    const conn = await connect();
//    const cargos = await conn.query("SELECT * FROM cargo");
//    res.json(cargos[0]);
// });



