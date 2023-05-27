export interface CustomerJwtDto {
  id: string;
  sub: string;
  email: string;
  rol: string;
  iat: number;
  exp: number;
}
