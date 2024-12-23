import { Box, AlertCircle } from "lucide-react";

// import Card from "../components/Card";
import UserIcon from "../components/UserIcon";
import ExpiredTable from "../components/ExpiredTable";
import SecondTable from "../components/SecondTable";
import Chart from "../components/Chart";
import Modal from "../components/utils/Modal";

// chart Data
// const CardData = [
//   {
//     title: "Inventory",
//     description: "Total Products in Stock",
//     value: 120,
//     icon: Box,
//     gradientFrom: "from-blue-500",
//     gradientTo: "to-blue-700",
//   },
//   {
//     title: "Expiring Soon",
//     description: "Products Nearing Expiration",
//     value: 8,
//     icon: AlertCircle,
//     gradientFrom: "from-red-500",
//     gradientTo: "to-red-700",
//   },
// ];

// data for the cards

const Dashboard = () => {
  return (
    <div className="w-screen mx-ao ">
      <UserIcon />
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {/* budget chart */}
        <div
          className={`bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg p-4 hover:shadow-2xl w-full md:w-[70%] md:h-64  md:ml-2 `}
        >
          <div className="flex flex-col md:flex md:flex-row items-center justify-between">
            <Chart />
            <div className="flex flex-col justify-center mr-20 p-2 text-slate-200 md:ml-5  md:mt-2 ">
              <span className="text-xl font-bold capitalize">
                budget balance
              </span>
              <p>as of 23, Dec, 2023</p>
              <p className="text-4xl mt-2 font-bold">#25,0000</p>
              <p className="mt-2">of #50,000</p>
              <Box className="hidden md:block w-12 h-12 opacity-75 mt-10 self-end ml-28" />
            </div>
          </div>
        </div>
        {/* div for the table */}
        <ExpiredTable />
      </div>

      {/* <div className="w-screen bg-gray-50 flex flex-col lg:flex-row lg:items-center lg:gap-10 ">
        <SecondTable />
      </div> */}

      <Modal />
    </div>
  );
};

export default Dashboard;
// {CardData.map((card, index) => (
//   <Card
//     key={index} // Always use a unique key when rendering list items
//     title={card.title}
//     description={card.description}
//     value={card.value}
//     icon={card.icon}
//     gradientFrom={card.gradientFrom}
//     gradientTo={card.gradientTo}
//   />
// ))}
