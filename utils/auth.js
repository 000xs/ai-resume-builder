import { account } from "./appwrite"; // Ensure this points to your configured appwrite.js

// Function to register a user
const registerUser = async (email, password, name) => {
  try {
    const response = await account.create("unique()", email, password, name);
    console.log("User registered:", response);
    return null;
  } catch (error) {
    return error;
  }
};

// Function to log in a user
const loginUser = async (email, password) => {
  try {
    const data = await account.createEmailPasswordSession(email, password);
    console.log("User logged in");
    return null;
  } catch (error) {
    console.error("Login error:", error);

    return error;
  }
};

// Function to get current session
const getCurrentSession = async () => {
  try {
    const session = await account.getSession("current");
    console.log("Current session:", session);
    return session;
  } catch (error) {
    console.error("Error fetching session:", error);
    return error;
  }
};

// Function to log out a user
const logoutUser = async () => {
  try {
    await account.deleteSession("current");
    console.log("User logged out");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

const checkSession = async () => {
  try {
    const session = await account.getSession("current");
    return session; // Returns session if it exists
  } catch (error) {
    console.error("No active session:", error);
    return null; // No active session
  }
};
export { registerUser, loginUser, getCurrentSession, logoutUser, checkSession };
