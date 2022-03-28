// import express,{Request,Response,Application} from "express"
// //import {connect} from './database'
// import morgan from 'morgan'
// import routerCargo from "./routes/cargo.routes";
// // se crea el servidor
// const app:Application = express();
// //middleware: funciones que se ejecutan como un hilo
// //Morgan es un Middleware de nivel de solicitud HTTP(muestra informacion de los request)
 
// app.use(morgan("dev"))
// app.use(express.json());
// // rutas del servidor
// app.get("/",(req,res)=>{
//   res.send("Bienvenidos a mi app")
// })
// app.use("/cargo",routerCargo);

// // ejecutar el servidor
// app.listen(3000,() => {
//     console.log("Servidor ejecutando en el puerto 3000");
// })
import {App} from './componentes/servidor'

const main = async () => {
  const app = new App();
  await app.listen()
}
main()
