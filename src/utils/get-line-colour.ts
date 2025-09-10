
export const getLineColor = (lineId: string) => {
    const colors: Record<string, string> = {
      bakerloo: "border-l-amber-600",
      central: "border-l-red-500",
      circle: "border-l-yellow-400",
      district: "border-l-green-500",
      "hammersmith-city": "border-l-pink-400",
      jubilee: "border-l-gray-500",
      metropolitan: "border-l-purple-600",
      northern: "border-l-black",
      piccadilly: "border-l-blue-800",
      victoria: "border-l-blue-400",
      "waterloo-city": "border-l-teal-400",
      dlr: "border-l-cyan-500",
      "london-overground": "border-l-orange-500",
      tram: "border-l-green-400",
    };
    return colors[lineId] || "border-l-gray-400";
  };