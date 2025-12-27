export interface SuccessLogin{
   message: string,
   token:string
   user:LoginUser
}
export interface LoginUser{
    name:string,
    email: string,
    role: string
}
export interface FailedLogin{
    message:string,
    statusMsg:string,
}