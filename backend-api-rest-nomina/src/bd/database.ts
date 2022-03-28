import { createPool, Pool } from "mysql2/promise";

// export async function connect() {
//   const connection = await createPool({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "nomina",
//     connectionLimit: 10,
//   });
  
//   return connection;
// }
// clase abstracta (clase base que se hereda pero no se puede instanciar)
abstract class Conexion {
  private conn: any;
  constructor(){
    this.conn=null
  }
  abstract getConneccion():Promise<Pool>
  get _conn():any {
     return this.conn;
  }
  set _conn(value) {
     this.conn=value;
  }
}

export class Coneccion extends Conexion {
  constructor() {
    super(); // ejecuta el constructor de la clase heredada
  }
  async connect() {
    const connection = await createPool({
      host: "localhost",
      user: "root",
      password: "root",
      database: "proyecto",
      connectionLimit: 10,
    });
    return connection;
  }
 async getConneccion(): Promise<Pool> {
    return await this.connect();
  }
}


