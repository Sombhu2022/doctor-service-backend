export const backendResponse = async({res , statusCode , ...options})=>{
    return  res.status(statusCode).json({ ...options})
}