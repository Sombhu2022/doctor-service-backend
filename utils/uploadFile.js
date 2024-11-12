import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import "dotenv/config"

const s3Client = new S3Client({
        region: process.env.REGION , 
        credentials:{
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey:process.env.AWS_SECRAT_KEY
        }
    })


export const sendSignUrl = async(fileName , type)=>{

    const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME ,
        Key: `upload/${fileName}`,
        ContentType: type
    });

    try {
        const url = await getSignedUrl(s3Client, command , {expiresIn : 36000 });
        // console.log("url",url);
        return { url , error:null };
      } catch (error) {
        console.error('Error getting signed URL', error);
        return { url :null , error}
      }
}



export const getFileUrl = async(req , res)=>{

     

}


