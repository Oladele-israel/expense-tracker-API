import { CalendarDays } from "lucide-react";

const App = () => {
  return (
    <>
      <div className="flex flex-col w-full ml-[17rem] ">
        {/* fixed title */}
        <div className="flex justify-between p-7">
          <div className=" ">
            <div className="text-[37px] font-semibold">Dashboard</div>
            <div className="text-[16px] text-[#92959E]">
              Information about your current budgets
            </div>
          </div>
          {/* date */}
          <div className=" w-[321px] flex items-center gap-2 bg-[#ECECEE] rounded-lg justify-center text-lg">
            <CalendarDays />
            <div>wednesday,17 May 2021</div>
          </div>
        </div>

        {/* main content */}
        <div className="w-full max-w-[90rem] flex mb-10 gap-5">
          {/* first div */}
          <div className="flex flex-col  w-[70%]">
            {/* first summary */}
            <div className="bg-white w-full max-w-3xl h-[150px] mt-10 rounded-xl">
              <div>
                <div></div>
              </div>
            </div>
            {/* second summary with charts*/}
            <div className="bg-white w-full max-w-3xl h-[450px] mt-10 rounded-xl"></div>
            {/* third cards with suggestion  */}
            <div className="flex gap-6 max-w-3xl">
              <div className="bg-white w-[50%]  max-w-2xl h-[403px] mt-10 rounded-xl"></div>
              <div className="bg-white w-[50%] max-w-2xl h-[403px] mt-10 rounded-xl"></div>
            </div>
          </div>
          {/* previous sugestion */} {/* second div ai suggestion */}
          <div className="bg-white w-[32%] h-[800px] mt-10 rounded-xl mr-2"></div>
        </div>
      </div>
    </>
  );
};

export default App;
