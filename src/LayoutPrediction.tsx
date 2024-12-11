import { ReactNode } from "react";
import Navbar from "./components/Navbar";

interface LayoutPredictionProps {
  children: ReactNode;
}

const LayoutPrediction = ({ children }: LayoutPredictionProps) => {
  return (
    <div className="flex min-h-screen w-full overflow-hidden  bg-gradient flex-col justify-center items-center">
      <Navbar />
      <main className="flex flex-grow pt-32 max-w-[1400px]">{children}</main>
    </div>
  );
};

export default LayoutPrediction;
