import { useEffect, useState } from "react";
import { Brain } from "lucide-react";
import axios from "axios";
import Loader from "../components/Loader.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AiSuggestion = () => {
  // State to store the AI suggestion response
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch AI insights
  const fetchAIInsights = async () => {
    try {
      setLoading(true); // Start loading when button is clicked
      const response = await axios.get(`${API_BASE_URL}/user/ai`, {
        withCredentials: true, // Pass credentials in the config object
      });
      console.log("this is the ai --->", response);
      setAiResponse(response.data.insights);
    } catch (err) {
      setError("Error fetching AI insights");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAIInsights();
  }, []);

  return (
    <section className="bg-gradient-to-br from-white via-gray-100 to-gray-100 shadow-lg md:w-[32%] h-[800px] mt-10 rounded-xl mr-2 p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="bg-[#551FFF] text-white rounded-full p-3 shadow-md">
          <Brain />
        </div>
        <h2 className="ml-4 text-lg font-bold text-gray-800">AI Suggestions</h2>
      </div>

      {/* Content */}
      <div className="flex-grow overflow-y-auto">
        <p className="text-sm text-gray-600">
          Welcome! Get personalized suggestions and insights powered by AI,
          based on your current spending.
        </p>

        <div className="text-gray-900 mt-10 w-full">
          {loading ? (
            <Loader />
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div>{aiResponse}</div> // Display AI response
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center">
        <button
          className="px-6 py-2 bg-[#551FFF] text-white rounded-full shadow-md hover:bg-[#3A13CC]"
          onClick={fetchAIInsights} // Refetch data on button click
        >
          Explore More
        </button>
      </div>
    </section>
  );
};

export default AiSuggestion;
