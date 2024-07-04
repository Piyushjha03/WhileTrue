import crypto from "crypto";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

// AWS configuration
const BUCKET_NAME = process.env.BUCKET_NAME;
const BUCKET_REGION = process.env.BUCKET_REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

const s3Client = new S3Client({
  region: BUCKET_REGION,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  },
});

// Function to upload a single file to S3
const uploadFileToAWS = async (filePath, fileKey) => {
  const fileContent = fs.createReadStream(filePath);

  const params = {
    Bucket: BUCKET_NAME,
    Key: fileKey,
    Body: fileContent,
    ContentType: "application/octet-stream",
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log(`Successfully uploaded ${filePath} as ${fileKey}`);
    return fileKey;
  } catch (error) {
    console.log("Error uploading file", error);
    return null;
  }
};

// Function to upload all files in a folder to S3 maintaining structure
const uploadFolderToAWS = async (folderPath, basePath = folderPath) => {
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      // Recursively upload subfolders
      await uploadFolderToAWS(filePath, basePath);
    } else {
      // Maintain the relative path structure
      const relativeFilePath = path.relative(basePath, filePath);
      await uploadFileToAWS(filePath, relativeFilePath);
    }
  }
};

// Function to get a signed URL for a file in S3
export const getSignedURL = async (Link) => {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: Link,
  });

  const url = await getSignedUrl(s3Client, command, {
    expiresIn: 60 * 60 * 24, // 24 hours
  });

  return url;
};

const currentFileUrl = import.meta.url;
const currentDirPath = path.dirname(new URL(currentFileUrl).pathname);
const folderPath = path.join(
  currentDirPath,
  "/uploads/3f4b0a17-a688-4570-9f4a-22a28f5d51cc"
);

// uploadFolderToAWS(folderPath)
//   .then(() => {
//     console.log("All files uploaded.");
//   })
//   .catch((err) => {
//     console.error("Error uploading folder:", err);
//   });

// (async () => {
//   await uploadFoldertoS3({
//     local_folder: folderPath,
//     remote_folder: "local_folder",
//   });
// })();

// Example usage
// const folderPath = path.join(__dirname, "path_to_your_folder");

// uploadFolderToAWS(folderPath)
//   .then(() => {
//     console.log("All files uploaded.");
//   })
//   .catch((err) => {
//     console.error("Error uploading folder:", err);
//   });
