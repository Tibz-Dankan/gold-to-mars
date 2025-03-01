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
  const earthGoldQuantity = useStatisticsStore(
    (state) => state.statistics.earthGoldQuantity
  );
  const marsGoldQuantity = useStatisticsStore(
    (state) => state.statistics.marsGoldQuantity
  );

  const quantityData = [
    { name: "Earth Gold", earthGold: earthGoldQuantity },
    { name: "Mars Gold", marsGold: marsGoldQuantity },
  ];

  return (
    <ResponsiveContainer width={200} height={200}>
      <BarChart data={quantityData} barCategoryGap={20}>
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
    </ResponsiveContainer>
  );
};

export const StatsValueBarChart: React.FC = () => {
  const goldValue = useStatisticsStore((state) => state.statistics.goldValue);
  const btcValue = useStatisticsStore((state) => state.statistics.btcValue);

  const valueData = [
    { name: "Gold Value", goldValue },
    { name: "BTC Value", btcValue },
  ];

  return (
    <ResponsiveContainer width={200} height={200}>
      <BarChart data={valueData} barCategoryGap={20}>
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
    </ResponsiveContainer>
  );
};
