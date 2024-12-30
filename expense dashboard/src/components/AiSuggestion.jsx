import { Brain } from "lucide-react";

const AiSuggestion = () => {
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
          Welcome! Get personalized suggestions and insights powered by AI. Stay
          ahead with recommendations tailored to your preferences.
        </p>
        <ul className="mt-4 space-y-4">
          <li className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md border border-gray-200">
            <p className="font-semibold text-gray-800">Suggestion 1</p>
            <p className="text-sm text-gray-600">
              Details about the suggestion...
            </p>
          </li>
          <li className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md border border-gray-200">
            <p className="font-semibold text-gray-800">Suggestion 2</p>
            <p className="text-sm text-gray-600">
              Details about the suggestion...
            </p>
          </li>
          <li className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md border border-gray-200">
            <p className="font-semibold text-gray-800">Suggestion 3</p>
            <p className="text-sm text-gray-600">
              Details about the suggestion...
            </p>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center">
        <button className="px-6 py-2 bg-[#551FFF] text-white rounded-full shadow-md hover:bg-[#3A13CC]">
          Explore More
        </button>
      </div>
    </section>
  );
};

export default AiSuggestion;
