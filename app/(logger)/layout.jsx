"use client";
import Header from "@/components/Logger/Header";
import { useStore } from "@/store/useStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const layout = ({ children }) => {
  const router = useRouter();
  const { user } = useStore();

  return (
    <main className="flex flex-col items-center min-h-screen ">
      {user && (
        <>
          <Header />
          {children}
        </>
      )}
    </main>
  );
};

export default layout;
