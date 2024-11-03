import React from "react";
import { Rect, Circle, Svg } from "react-native-svg";

const RobotIcon = ({ size = 24, color = "#64C5B7" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    {/* Robot Head */}
    <Rect x="4" y="4" width="16" height="16" rx="2" fill={color} />

    {/* Robot Eyes */}
    <Circle cx="9" cy="10" r="2" fill="white" />
    <Circle cx="15" cy="10" r="2" fill="white" />

    {/* Robot Mouth */}
    <Rect x="8" y="14" width="8" height="2" fill="white" />
  </Svg>
);

export default RobotIcon;
