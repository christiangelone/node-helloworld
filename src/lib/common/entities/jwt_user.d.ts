export default interface JwtUser {
  name: string
  email: string;
  roles: string[];
  extras: any
}