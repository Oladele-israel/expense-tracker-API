import { CalendarDays } from "lucide-react";

const DashboardHeader = () => {
  const getFormattedDate = () => {
    const today = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return today.toLocaleDateString("en-US", options);
  };

  return (
    <div className="flex justify-between p-4 md:p-7 bg-white shadow-md md:bg-none md:shadow-none">
      <div>
        <div className="text-2xl md:text-[37px] font-semibold">Dashboard</div>
        <div className="text-[12px] md:text-[16px] mt-1 text-[#92959E]">
          Information about your current budgets
        </div>
      </div>
      {/* date */}
      <div className="w-40 md:w-[321px] flex items-center gap-2 bg-[#ECECEE] rounded-lg justify-center text-lg p-2">
        <CalendarDays />
        <div className="text-sm">{getFormattedDate()}</div>
      </div>
    </div>
  );
};

export default DashboardHeader;
