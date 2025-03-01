import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useStatisticsStore } from "../../store/statistics";

export const StatsQuantityBarChart: React.FC = () => {
  const statistics = useStatisticsStore((state) => state.statistics);

  const quantityData = [
    { name: "Earth Gold", earthGold: statistics.earthGoldQuantity },
    { name: "Mars Gold", marsGold: statistics.marsGoldQuantity },
  ];

  return (
    <ResponsiveContainer width={200} height={200}>
      <BarChart data={quantityData} barCategoryGap={20}>
        <XAxis
          dataKey="name"
          stroke="#868e96"
          tick={{ fill: "#ced4da", fontSize: 10 }}
          angle={-45}
        />
        <YAxis stroke="#868e96" tick={{ fill: "#ced4da", fontSize: 10 }} />
        <Tooltip contentStyle={{ fontSize: 10 }} />
        <Bar dataKey="earthGold" fill="#1E90FF" name="Earth Gold" />
        <Bar dataKey="marsGold" fill="#B7410E" name="Mars Gold" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const StatsValueBarChart: React.FC = () => {
  const statistics = useStatisticsStore((state) => state.statistics);

  const valueData = [
    { name: "Gold Value", goldValue: statistics.goldValue },
    { name: "BTC Value", btcValue: statistics.btcValue },
  ];

  return (
    <ResponsiveContainer width={200} height={200}>
      <BarChart data={valueData} barCategoryGap={20}>
        <XAxis
          dataKey="name"
          stroke="#868e96"
          tick={{ fill: "#ced4da", fontSize: 10 }}
          angle={-45}
        />
        <YAxis stroke="#868e96" tick={{ fill: "#ced4da", fontSize: 10 }} />
        <Tooltip contentStyle={{ fontSize: 10 }} />
        <Bar dataKey="goldValue" fill="#FFD700" name="Gold Value" />
        <Bar dataKey="btcValue" fill="#F7931A" name="BTC Value" />
      </BarChart>
    </ResponsiveContainer>
  );
};
