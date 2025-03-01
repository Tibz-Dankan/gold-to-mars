import React from "react";
import {
  StatsQuantityBarChart,
  StatsValueBarChart,
} from "../UI/StatisticsBarCharts";

export const StatisticsLayout: React.FC = () => {
  return (
    <div className="w-50s flex items-end justify-center gap-4">
      <StatsValueBarChart />
      <StatsQuantityBarChart />
    </div>
  );
};
