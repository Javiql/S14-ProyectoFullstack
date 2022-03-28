"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// importar router
const express_1 = require("express");
const database_1 = require("../database");
// instanciar router - ruteador
const router = (0, express_1.Router)();
// crear rutas de cargos
router.route("/").get((req, res) => {
    res.send("Bienvenido a mi Pagina principal de cargos");
});
router.route("/cargo").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield (0, database_1.connect)();
    const cargos = yield conn.query("SELECT * FROM cargo");
    res.json(cargos[0]);
}));
exports.default = router;
