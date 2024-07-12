import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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
const uploadFileToS3 = async (localPath, remotePath) => {
  const fileContent = fs.readFileSync(localPath);

  const params = {
    Bucket: BUCKET_NAME,
    Key: remotePath,
    Body: fileContent,
    ContentType: "application/octet-stream",
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    console.log(`Successfully uploaded ${localPath} as ${remotePath}`);
  } catch (error) {
    console.error(`Error uploading ${localPath}:`, error);
  }
};

// Function to upload all files in a folder to S3 maintaining structure
export const uploadFolderToS3 = async ({ localFolder, remoteFolder }) => {
  const contents = fs.readdirSync(localFolder);

  for (const content of contents) {
    const contentPath = path.join(localFolder, content);

    if (fs.lstatSync(contentPath).isDirectory()) {
      // Recursively upload subfolders
      await uploadFolderToS3({
        localFolder: contentPath,
        remoteFolder: path.join(remoteFolder, content),
      });
    } else {
      // Upload individual files
      const remotePath = path.join(remoteFolder, content);
      await uploadFileToS3(contentPath, remotePath);
    }
  }
};

// // Function to get a signed URL for a file in S3
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
  "../uploads/3f4b0a17-a688-4570-9f4a-22a28f5d51cc"
);
const remoteFolder = "test_folder";
