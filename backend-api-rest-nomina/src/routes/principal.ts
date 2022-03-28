import {Router} from "express"
import { menuPrincipal } from "../controllers/principal.controller"
const router = Router()
router.route("/").get(menuPrincipal)
export default router