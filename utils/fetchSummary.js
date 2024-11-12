import axios from "axios";

const fetchSummary = async (userData) => {
  const sendData = {
    Education: userData.Education,
    JobExperience: userData.JobExperience,
    Skills: userData.Skills
  }
    try {
      const response = await axios.post("/api/generate-content",sendData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data; // Axios automatically parses JSON response
    } catch (error) {
      console.error("Error fetching summary:", error);
      throw error; // Re-throw the error for further handling if needed
    }
  };
export default fetchSummary;

