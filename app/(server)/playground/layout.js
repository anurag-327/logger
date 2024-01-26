import Button from "@/components/Playground/Button";
import Header from "@/components/Playground/Header";
import Showcase from "@/components/Playground/Showcase";
import Sidebar from "@/components/Playground/Sidebar";
const Layout = ({ children }) => {
  return (
    <div className="w-full bg-white no-scrollbar">
      <Header />
      <div className="relative w-full min-h-screen overflow-hidden ">
        <Button />
        <div className="relative flex w-full min-h-screen mt-0 overflow-hidden md:mt-14 ">
          <Sidebar />
          {children}
          <Showcase />
        </div>
      </div>
    </div>
  );
};

export default Layout;
