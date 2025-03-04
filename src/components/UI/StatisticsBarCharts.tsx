import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  // ResponsiveContainer,
} from "recharts";
import { useStatisticsStore } from "../../store/statistics";

export const StatsQuantityBarChart: React.FC = () => {
  const earthGoldQuantity = useStatisticsStore((state) =>
    parseInt(state.statistics.earthGoldQuantity.toFixed(0))
  );
  const marsGoldQuantity = useStatisticsStore((state) =>
    parseInt(state.statistics.marsGoldQuantity.toFixed(0))
  );

  const quantityData = [
    { name: "Earth Gold", earthGold: earthGoldQuantity },
    { name: "Mars Gold", marsGold: marsGoldQuantity },
  ];

  return (
    // <ResponsiveContainer width={200} height={200}>
    <BarChart width={200} height={200} data={quantityData} barCategoryGap={20}>
      <XAxis
        dataKey="name"
        stroke="#868e96"
        tick={{ fill: "#ced4da", fontSize: 12 }}
        angle={-45}
      />
      <YAxis stroke="#868e96" tick={{ fill: "#ced4da", fontSize: 12 }} />
      <Tooltip contentStyle={{ fontSize: 12 }} />
      <Bar dataKey="earthGold" fill="#1E90FF" name="Earth Gold" />
      <Bar dataKey="marsGold" fill="#B7410E" name="Mars Gold" />
    </BarChart>
    // </ResponsiveContainer>
  );
};

export const StatsValueBarChart: React.FC = () => {
  const goldValue = useStatisticsStore((state) =>
    parseInt(state.statistics.goldValue.toFixed(0))
  );
  const btcValue = useStatisticsStore((state) =>
    parseInt(state.statistics.btcValue.toFixed(0))
  );

  const valueData = [
    { name: "Gold Value", goldValue },
    { name: "BTC Value", btcValue },
  ];

  return (
    // <ResponsiveContainer width={200} height={200}>
    <BarChart width={200} height={200} data={valueData} barCategoryGap={20}>
      <XAxis
        dataKey="name"
        stroke="#868e96"
        tick={{ fill: "#ced4da", fontSize: 12 }}
        angle={-45}
      />
      <YAxis stroke="#868e96" tick={{ fill: "#ced4da", fontSize: 12 }} />
      <Tooltip contentStyle={{ fontSize: 12 }} />
      <Bar dataKey="goldValue" fill="#FFD700" name="Gold Value" />
      <Bar dataKey="btcValue" fill="#F7931A" name="BTC Value" />
    </BarChart>
    // </ResponsiveContainer>
  );
};
