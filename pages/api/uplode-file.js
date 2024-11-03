// pages/api/upload-file.js
import { Client, Storage } from 'appwrite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Appwrite client
const client = new Client();
const storage = new Storage(client);

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT) // Your Appwrite API Endpoint
  .setProject(process.env.APPWRITE_PROJECT_ID); // Your Appwrite Project ID

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to handle file uploads manually
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let fileBuffer = [];

  req.on('data', chunk => {
    fileBuffer.push(chunk); // Collect chunks of data
  });

  req.on('end', async () => {
    try {
      // Combine the chunks into a single buffer
      const completeBuffer = Buffer.concat(fileBuffer);
      
      // Define the bucket ID from your environment variables
      const bucketId = process.env.APPWRITE_BUCKET_ID;

      // Get the filename from the headers (if provided)
      const contentDisposition = req.headers['content-disposition'];
      let fileName = 'uploaded-file'; // Default filename
      
      if (contentDisposition) {
        const matches = /filename="(.+)"/.exec(contentDisposition);
        if (matches && matches.length > 1) {
          fileName = matches[1]; // Extract filename from content-disposition header
        }
      }

      // Upload the file to Appwrite
      const uploadedFile = await storage.createFile(bucketId, fileName, completeBuffer);

      // Return a success response
      res.status(200).json({
        message: 'File uploaded successfully',
        fileId: uploadedFile.$id,
        fileName: uploadedFile.name,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      
      // Enhanced error handling based on error type
      if (error.code === 400) {
        res.status(400).json({ error: 'Bad Request: Invalid input' });
      } else if (error.code === 404) {
        res.status(404).json({ error: 'Not Found: Bucket does not exist' });
      } else if (error.code === 500) {
        res.status(500).json({ error: 'Internal Server Error: Failed to upload file' });
      } else {
        res.status(500).json({ error: 'An unexpected error occurred', details: error.message });
      }
    }
  });

  req.on('error', err => {
    console.error('Request error:', err);
    res.status(500).json({ error: 'Failed to upload file due to request error' });
  });
}