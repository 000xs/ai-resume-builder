// utils/uplode.js
import { Client, Storage, ID } from 'appwrite';
 
import dotenv from 'dotenv';

dotenv.config();

const client = new Client();
const storage = new Storage(client);

const endpoint = process.env.APPWRITE_ENDPOINT;
const projectId = process.env.APPWRITE_PROJECT_ID;

// Set your Appwrite API endpoint and project ID
client.setEndpoint(endpoint); 
client.setProject(projectId); 

export const uplodeBucket = async (fileStream) => {
    try {
        const bucketId = process.env.APPWRITE_BUCKET_ID; // Replace with your actual bucket ID
        const fileId = ID.unique(); // Generate a unique file ID

        // Use createFile method with the stream
        const response = await storage.createFile(bucketId, fileId, fileStream);

        console.log('File uploaded successfully:', response);
        return response; // Return response if needed
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error; // Rethrow to handle it in the calling function
    }
};