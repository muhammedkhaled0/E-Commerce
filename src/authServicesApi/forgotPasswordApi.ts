export async function sendResetEmail(email:string){
    const response=await fetch('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',{
        method:'POST',
        body:JSON.stringify({
            email,
        }),
        headers:{
            'content-type':'application/json',
        }
    })
    const data=await response.json()
    return data
    
}
export async function verifyResetCode(code:string){
    const response=await fetch('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',{
        method:'POST',
        body:JSON.stringify({
            resetCode:code,
        }),
        headers:{
            'content-type':'application/json',
        }
    })
    const data=await response.json()
    return data
}
export async function resetPassword(email:string,newPassword:string){
    const response=await fetch('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',{
        method:'PUT',
        body:JSON.stringify({
            email,
            newPassword,
        }),
        headers:{
            'content-type':'application/json',
        }
    })
    const data=await response.json()
    return data
    
}

