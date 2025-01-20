import { useContext, useEffect, useState } from "react";
import { TopBar } from "../components";
import { Container } from "../styles";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { UserContext } from "../contexts/UserContext";
const Dashboard = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    document.title = "Organizer.ai - Dashboard";
  }, []);

  interface ChartData {
    name: string;
    value: number;
  }

  interface Task {
    category?: { name: string }[];
    sentiment?: string;
    status?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  const processData = (field: keyof Task): ChartData[] => {
    // Group by the selected field and count occurrences
    const groupedData = user.tasks.reduce<Record<string, number>>((acc, item: Task) => {
      const key = field === "category" ? item[field]?.[0]?.name : item[field] || "UnCategorized";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    // Convert to chart-compatible format
    return Object.keys(groupedData).map((key) => ({
      name: key,
      value: groupedData[key],
    }));
  };
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#B624FF"];
  const options = [
    { label: "Category", value: "category" },
    { label: "Sentiment", value: "sentiment" },
    { label: "Status", value: "status" },
  ];
  const [selectedField, setSelectedField] = useState<keyof Task>("category");
  const chartData = processData(selectedField);

  return (
    <Container>
      <TopBar title="Dashboard" />

      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.label}
        value={options.find((option) => option.value === selectedField) || options[0]}
        onChange={(_event, newValue) => {
          if (newValue) {
            setSelectedField(newValue.value);
          }
        }}
        renderInput={(params) => <TextField {...params} label="Field" />}
        style={{ width: 300, marginBottom: 2 }}
      />

      <PieChart width={600} height={600}>
        <Pie
          data={chartData}
          cx={300}
          cy={300}
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}`}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </Container>
  );
};
export default Dashboard;
