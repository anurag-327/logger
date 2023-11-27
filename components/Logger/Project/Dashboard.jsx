import React from "react";

const Dashboard = ({ project }) => {
  return (
    <div className="w-full overflow-hidden">{JSON.stringify(project)}</div>
  );
};

export default Dashboard;
