"use client"
import React, { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface ChartData {
  course: string
  score: number
}

const data: ChartData[] = [
  { course: "Design System", score: 68 },
  { course: "Color Theory", score: 40 },
  { course: "Prototyping", score: 48 },
  { course: "Low Fidelity", score: 40 },
  { course: "High Fidelity", score: 30 },
]

// Colors for the pie chart slices
const COLORS = ["#3B00ED", "#9C27B0", "#D81B60", "#FF9800", "#D7D7D7"]

const QuizPerformanceChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)
  const [percentage, setPercentage] = useState<number>(0)

  const handleClick = (index: number) => {
    // Toggle active index or reset if already active
    setActiveIndex(index === activeIndex ? undefined : index)

    // Update percentage based on the clicked slice's score
    const selectedScore = data[index]?.score || 0
    setPercentage(Math.round((selectedScore / 100) * 100)) // Percentage of clicked slice
  }

  return (
    <div className="w-full flex flex-col lg-md:flex-row gap-8 py-4 px-4">
      <div className="w-[220px] h-[220px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="score"
              nameKey="course"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={1}
              activeIndex={activeIndex} // Active index can be undefined or a number
              onClick={(_, index: number) => handleClick(index)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  style={{ cursor: "pointer", outline: "none" }}
                />
              ))}
            </Pie>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                fill: "#333",
              }}
            >
              {`${percentage}%`}
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="w-[232px] flex flex-col gap-[15px]  place-content-center">
        {data.map((entry, index) => (
          <div key={index} className="flex gap-[14px]">
            <span
              className="w-[17px] h-[17px] rounded-full"
              style={{ background: COLORS[index % COLORS.length] }}
            ></span>
            <div className="w-full flex gap-2 font-jost font-normal text-sm tracking-[0.25px] text-left text-[#000000]/60">
              <span className="w-full">{entry.course}</span>
              <span>{`${entry.score}/100`}</span>{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuizPerformanceChart
