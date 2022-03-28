import { Request, Response } from "express";

export function menuPrincipal(req: Request, res: Response): Response {
  return res.json("Pagina Principal");
}
