import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Sample data
const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

// Colors for the pie slices
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// A custom label for the center
const renderCustomLabel = ({ cx, cy }) => {
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  const percentage = ((data[0].value / total) * 100).toFixed(1); // Change index as needed
  return (
    <text
      x={cx}
      y={cy}
      textAnchor="middle"
      dominantBaseline="middle"
      style={{ fontSize: "16px", fontWeight: "bold" }}
    >
      {`${percentage}%`}
    </text>
  );
};

const Chart = () => (
  <ResponsiveContainer
    width="70%"
    height={200}
    className=" lg:border-r p-3 border-slate-300"
  >
    <PieChart>
      <Pie
        data={data}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={100}
        fill="#8884d8"
        labelLine={false}
        label={renderCustomLabel} // Custom label in the center
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
);

export default Chart;
