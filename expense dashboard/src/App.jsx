import AiSuggestion from "./components/AiSuggestion.jsx";
import DashboardHeader from "./components/DashboardHeader.jsx";
import Summary from "./components/Summary.jsx";

const App = () => {
  return (
    <>
      <div className="flex flex-col w-full md:ml-[17rem] ">
        <DashboardHeader />
        <div className="w-full flex flex-col md:flex-row mb-10 gap-5">
          <Summary />
          <AiSuggestion />
        </div>
      </div>
    </>
  );
};

export default App;
