import React from "react";

interface ProgressBarProps {
  progress: number;
  minScore: number;
  maxScore: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, minScore, maxScore }) => {
  const calculateProgress = () => {
    if (progress < minScore) {
      return 0;
    } else if (progress > maxScore) {
      return 100;
    } else {
      return ((progress - minScore) / (maxScore - minScore)) * 100;
    }
  };

  const getProgressBarColor = (progressValue: number) => {
    const hue = (120 * (100 - progressValue)) / 100; // Hue from 120 (green) to 0 (red)
    const lightness = 30 + (progressValue / 100) * 20; // Lightness 30% to 50%
    return `hsl(${hue}, 100%, ${lightness}%)`;
  };

  const currentProgress = calculateProgress();
  const progressColor = getProgressBarColor(currentProgress);

  return (
    <div className="w-full bg-gray-300 rounded-md h-6 overflow-hidden">
      <div
        style={{
          width: `${currentProgress}%`,
          backgroundColor: progressColor,
        }}
        className="h-full transition-all duration-300"
      ></div>
    </div>
  );
};

export default ProgressBar;
