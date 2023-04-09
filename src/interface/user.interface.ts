export interface IUser {
  id:number;
  email:string;
  roles:IRole[]
}
export interface IRole {
  value:string;
  description:string
}