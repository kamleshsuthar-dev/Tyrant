import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function CustomPieChart({ average }){
  const percentage = (average / 5) * 100;

  const data = [
    { name: "Rating", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ];

  const COLORS = ["#202020", "#9EFF00"];

  return (
    <div className="relative w-[180px] h-[180px] ">
      <ResponsiveContainer width="100%" height="100%" >
        <PieChart>
        <Pie
            data={[{ name: "Inner", value: 100 }]}
            dataKey="value"
            innerRadius="0%"
            outerRadius="100%"
            fill="#9EFF00"
            stroke="none"
            className="z-0"
            isAnimationActive={false}
          />

          <Pie
            data={data}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            innerRadius="90%"
            outerRadius="100%"
            stroke="none"
            cornerRadius={20}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} 
              className="z-10"
              />
            ))}
          </Pie>
          
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-[40px] font-bold font-automata">{average}</div>
      </div>
    </div>
  );
};


