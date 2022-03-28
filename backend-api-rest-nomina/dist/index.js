"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cargo_routes_1 = __importDefault(require("./routes/cargo.routes"));
// se crea el servidor
const app = (0, express_1.default)();
//middleware: funciones que se ejecutan como un hilo
//Morgan es un Middleware de nivel de solicitud HTTP(muestra informacion de los request)
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
// rutas del servidor
app.use("/", cargo_routes_1.default);
// ejecutar el servidor
app.listen(3000, () => {
    console.log("Servidor ejecutando en el puerto 3000");
});
