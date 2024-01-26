import Header from "@/components/Home/Header";
import Home from "@/components/Home/Home";
import Badge1 from "@/components/UI/Badges/Badge1";
import Footer from "@/components/UI/Footer";
export default function page() {
  return (
    <>
      <main className="flex flex-col items-center min-h-[90vh] px-2 sm:px-6 ">
        <Badge1 />
        <Header />
        <Home />
      </main>
    </>
  );
}
