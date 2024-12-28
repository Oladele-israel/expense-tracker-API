import { CalendarDays } from "lucide-react";

const DashboardHeader = () => {
  return (
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
  );
};

export default DashboardHeader;
