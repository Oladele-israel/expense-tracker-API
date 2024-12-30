import FirstSummary from "./firstSummary";
import paper from "../assets/images/paper.svg";
import Graph from "../assets/images/Graph.svg";
import Swap from "../assets/images/Swap.svg";
import Profile from "../assets/images/Profile.svg";
import Charts from "./Charts";
import BudgetChart from "./budgetChart";
import { SlidersHorizontal } from "lucide-react";

const budgetData = [
  { name: "Leisure", percentage: "25%", color: "#4CAF50" }, // Green
  { name: "Groceries", percentage: "20%", color: "#FF9800" }, // Orange
  { name: "Rent", percentage: "35%", color: "#2196F3" }, // Blue
  { name: "Transport", percentage: "10%", color: "#FF5722" }, // Red
  { name: "Savings", percentage: "10%", color: "#9C27B0" }, // Purple
];

const firstData = [
  {
    icon: paper,
    desc: "Projects",
    num: 7,
    bg: "#FFF2E9",
  },
  {
    icon: Swap,
    desc: "Budgets",
    num: 7,
    bg: "#EDE8FF",
  },
  {
    icon: Profile,
    desc: "Total Expense",
    num: 7,
    bg: "#EAF9FF",
  },
  {
    icon: Graph,
    desc: "Categories",
    num: 7,
    bg: "#FFEBEF",
  },
];

const Summary = () => {
  return (
    <div className="flex flex-col md:w-[80%] p-2 md:p-0 overflow-hidden">
      {/* First summary */}
      <div className="bg-white w-full mt-10 rounded-xl p-6 md:p-8 lg:p-10 ">
        <div className="flex flex-col gap-6 md:flex-row md:flex-wrap md:justify-between lg:gap-8">
          {firstData.map((data, index) => (
            <FirstSummary
              key={index}
              icon={data.icon}
              desc={data.desc}
              num={data.num}
              bg={data.bg}
            />
          ))}
        </div>
      </div>

      {/* Second summary with charts */}
      <div className="bg-white w-full h-[500px] mt-10 rounded-xl p-2 md:p-10 flex flex-col gap-2">
        <div className=" text-base md:text-xl font-bold capitalize">
          expense for the past 6 months
        </div>
        <Charts />
      </div>

      {/* Third cards with budget category */}
      <div className="flex gap-6 flex-col md:flex-row">
        <div className="bg-white md:w-[50%] h-[403px] mt-10 rounded-xl p-6 flex">
          {/* Left Section: Category List */}
          <div className="w-[50%] flex flex-col justify-center">
            <div className="text-lg font-bold mb-4">Budget Category</div>
            <div className="space-y-4">
              {/* Categories with dots */}
              {budgetData.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center text-sm text-gray-600"
                >
                  {/* Colored Dot */}
                  <span
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: category.color }}
                  ></span>
                  {/* Category Name and Percentage */}
                  <p>
                    {category.name} : {category.percentage}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: Budget Chart */}
          <div className=" w-[70%] md:w-[50%]">
            <BudgetChart />
          </div>
        </div>
        <div className="bg-white md:w-[50%] h-[403px] mt-10 rounded-xl shadow-md flex flex-col">
          {/* Filter Section */}
          <div className="flex justify-between p-5 border-b border-gray-200">
            <div className="text-center capitalize font-bold text-gray-800">
              Filter Total Expense
            </div>
            <div className="flex justify-center items-center gap-3 bg-gray-100 p-2 rounded-lg shadow-sm">
              <SlidersHorizontal className="text-gray-500 w-5 h-5" />
              <select
                name="time-filter"
                id="time-filter"
                className="p-2 bg-transparent text-gray-700 focus:outline-none"
              >
                <option value="past-week">Past Week</option>
                <option value="past-month">Past Month</option>
                <option value="past-year">Past Year</option>
              </select>
            </div>
          </div>
          {/* Total Expense Section */}
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            <div className="text-gray-600 text-sm uppercase tracking-wide">
              Total Expense:
            </div>
            <div className="text-2xl font-bold text-gray-800">$12,345.67</div>
          </div>
          {/* Total Amount Section */}
          <div className="flex flex-col justify-center items-center gap-2 mt-3">
            <div className="text-gray-600 text-sm uppercase tracking-wide">
              Total Amount:
            </div>
            <div className="text-2xl font-bold text-gray-800">$20,000.00</div>
          </div>
          {/* Footer */}
          <div className="mt-auto p-5 text-center text-gray-500 text-sm">
            Data updated as of Dec 2024
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
