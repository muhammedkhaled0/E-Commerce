export async function registerApi(name:string,email:string,password:string,rePassword:string,phone:string){
    const response=await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup',{
        method:'POST',
        body:JSON.stringify({
            name,
            email,
            password,
            rePassword,
            phone
        }),
        headers:{
            'content-type':'application/json',
        }
    })
    const data=await response.json()
    console.log(data);
    
}