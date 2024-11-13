import { Client, Account } from 'appwrite';

const client = new Client();

// Log environment variables for debugging
console.log('Appwrite Endpoint:', process.env.APPWRITE_ENDPOINT);
console.log('Appwrite Project ID:', process.env.APPWRITE_PROJECT_ID);

// Set endpoint and project ID
client.setEndpoint(process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1'); // Default fallback
client.setProject(process.env.APPWRITE_PROJECT_ID || '67170659001011a4ed49'); // Default fallback

export const account = new Account(client);