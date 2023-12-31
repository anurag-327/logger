const Loader = () => {
  return (
    <div className="flex items-center z-[1000] justify-center min-h-screen p-5 min-w-screen">
      <div className="flex space-x-2 animate-pulse">
        <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
};
export default Loader;
