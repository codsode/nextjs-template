import React from "react";

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
  bgColor?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
  fullScreen = true,
  bgColor = "bg-gray-900",
}) => {
  const containerClass = fullScreen
    ? "min-h-screen flex items-center justify-center"
    : "flex items-center justify-center p-8";

  return (
    <div className={`${containerClass} ${bgColor}`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
        <p className="text-gray-200 text-lg">{message}</p>
      </div>
    </div>
  );
};
