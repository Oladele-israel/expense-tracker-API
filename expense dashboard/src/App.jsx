import AiSuggestion from "./components/AiSuggestion";
import DashboardHeader from "./components/DashboardHeader";
import Summary from "./components/Summary";

const App = () => {
  return (
    <>
      <div className="flex flex-col w-full ml-[17rem] ">
        <DashboardHeader />
        <div className="w-full flex mb-10 gap-5">
          <Summary />
          <AiSuggestion />
        </div>
      </div>
    </>
  );
};

export default App;
