import { ReactNode } from "react";
import Navbar from "./components/Navbar";

interface LayoutProps {
  children: ReactNode;
  paddingTop?: string; // Optional padding-top prop
}

const Layout = ({ children, paddingTop = "pt-40" }: LayoutProps) => {
  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-[#DDEFE3] flex-col">
      <Navbar />
      <main className="flex flex-grow max-w-[1400px] mx-auto px-4">
        {/* Dynamically apply padding-top */}
        <div className={`${paddingTop} w-full`}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
