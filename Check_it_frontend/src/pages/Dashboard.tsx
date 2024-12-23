import { Box, AlertCircle } from "lucide-react";

import Card from "../components/Card";
import UserIcon from "../components/UserIcon";
import ExpiredTable from "../components/ExpiredTable";
import SecondTable from "../components/SecondTable";
import Chart from "../components/Chart";
import Modal from "../components/utils/Modal";

// chart Data
const CardData = [
  {
    title: "Inventory",
    description: "Total Products in Stock",
    value: 120,
    icon: Box,
    gradientFrom: "from-blue-500",
    gradientTo: "to-blue-700",
  },
  {
    title: "Expiring Soon",
    description: "Products Nearing Expiration",
    value: 8,
    icon: AlertCircle,
    gradientFrom: "from-red-500",
    gradientTo: "to-red-700",
  },
];

// data for the cards

const Dashboard = () => {
  return (
    <div className="w-screen ">
      <UserIcon />
      <div className="grid gap-6 md:grid-cols-2 ml-auto mr-auto lg:m-0 p-4 w-[94%]">
        {/* Map through CardData array to render Card components */}
        {CardData.map((card, index) => (
          <Card
            key={index} // Always use a unique key when rendering list items
            title={card.title}
            description={card.description}
            value={card.value}
            icon={card.icon}
            gradientFrom={card.gradientFrom}
            gradientTo={card.gradientTo}
          />
        ))}
      </div>
      <div className="w-screen bg-gray-50 flex flex-col lg:flex-row lg:items-center lg:gap-10 ">
        <Chart />
        <SecondTable />
      </div>
      <ExpiredTable />
      <Modal />
    </div>
  );
};

export default Dashboard;
