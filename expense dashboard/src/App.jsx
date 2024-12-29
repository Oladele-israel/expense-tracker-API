import AiSuggestion from "./components/AiSuggestion";
import DashboardHeader from "./components/DashboardHeader";
import Summary from "./components/Summary";

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
