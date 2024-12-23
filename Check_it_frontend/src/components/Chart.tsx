import { data } from "../Data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  return (
    <div className="w-full lg:w-[50%] h-[400px] mt-5 ">
      {/* card for the graph description */} {/* charts */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" stackId="a" fill="#669bbc" />
          <Bar dataKey="amt" stackId="a" fill="#c1121f" />
          <Bar dataKey="uv" fill="#003049" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
