"use client";
import Globe from "@/components/Logger/Project/Globe";

const Home = () => {
  const data = [
    { lat: 37.7749, lon: -122.4194, name: "San Francisco" },
    { lat: 40.7128, lon: -74.006, name: "New York City" },
    // Add more data points as needed
  ];

  return (
    <div>
      <h1>3D Globe Visualization</h1>
      <Globe data={data} />
    </div>
  );
};

export default Home;
