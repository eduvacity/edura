import React from "react"
import { twMerge } from "tailwind-merge"

interface CircularProgressProps {
  percentage: number
  className?: string
  color?: string
  text?: string
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  className,
  color,
  text,
}) => {
  // Ensure percentage is between 0 and 100
  const clampedPercentage = Math.min(100, Math.max(0, percentage))

  // Calculate stroke dasharray and stroke dashoffset based on the percentage
  const radius = 50 // Radius of the circle
  const strokeWidth = 10 // Stroke width of the circle
  const circumference = 2 * Math.PI * radius // Circumference of the circle
  const strokeDashoffset =
    circumference - (clampedPercentage / 100) * circumference // Offset the stroke based on the percentage

  function CircularProgressbarIcon() {
    return (
      <svg
        width="70"
        height="70"
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
        className={twMerge("transform -rotate-90", className)}
      >
        <circle
          cx="60"
          cy="60"
          r={radius}
          opacity="0.3"
          stroke="#AEAEAE"
          strokeWidth={strokeWidth}
          fill="none"
          className="rounded-[18.96px]"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={color ? color : "#3FA46E"}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="rounded-[18.96px]"
        />
      </svg>
    )
  }
  return (
    <div className="flex justify-center items-center relative">
      <CircularProgressbarIcon />
      {/* Displaying the Percentage in the center */}
      <div
        className={`absolute ${
          text ? text : "text-[16.25px]/[26.25px]"
        } font-semibold font-arial -tracking-[0.001em] text-left text-black`}
      >
        {clampedPercentage}%
      </div>
    </div>
  )
}

export default CircularProgress
