import { S3Client } from "@aws-sdk/client-s3"
import 'dotenv/config'

export const awsConfig = async()=>{
 
    const s3Client = new S3Client({
        region: process.env.REGION , 
        credentials:{
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey:process.env.AWS_SECRAT_KEY
        }
    })
  return s3Client;
}

const s3 = awsConfig();


