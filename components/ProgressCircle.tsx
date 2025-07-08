import React from "react";
import { View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface ProgressCircleProps {
  percent?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bg?: string;
  children?: React.ReactNode;
}

export function ProgressCircle({
  percent = 0,
  size = 56,
  strokeWidth = 4,
  color = "#22c55e",
  bg = "#e5e7eb",
  children,
}: ProgressCircleProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference * (1 - percent / 100);

  return (
    <View className="flex-1" style={{ width: size, height: size, justifyContent: "center", alignItems: "center" }}>
      <Svg width={size} height={size}>
        <Circle
          stroke={bg}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={{ position: "absolute", justifyContent: "center", alignItems: "center", width: size, height: size }}>
        {children}
      </View>
    </View>
  );
}