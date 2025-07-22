// components/GradientBackground.tsx
import React from "react";
import { ViewStyle, ColorValue } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface GradientBackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
  colors?: [ColorValue, ColorValue, ...ColorValue[]]; // Ensure it's a tuple
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

const DEFAULT_COLORS: [ColorValue, ColorValue, ColorValue] = [
  "#1a1a1a",
  "#3a3a3a",
  "#1a1a1a",
];
const DEFAULT_START = { x: 0, y: 0 };
const DEFAULT_END = { x: 1, y: 1 };
const DEFAULT_STYLE: ViewStyle = { flex: 1 };

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  style = DEFAULT_STYLE,
  colors = DEFAULT_COLORS,
  start = DEFAULT_START,
  end = DEFAULT_END,
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={[DEFAULT_STYLE, style]}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;
