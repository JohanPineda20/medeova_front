export interface UsuarioJwtDto {
  id: string;
  sub: string;
  email: string;
  rol: string;
  iat: number;
  exp: number;
}
