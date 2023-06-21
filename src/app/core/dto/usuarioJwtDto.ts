import { Rol } from "./Rol";

export interface UsuarioJwtDto {
  id: string;
  sub: string;
  rol: Rol[];
  iat: number;
  exp: number;
}
