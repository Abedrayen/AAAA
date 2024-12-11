import React from "react";
import { FaArrowRight } from "react-icons/fa6";

interface ListItemProps {
  title: string;
}

const ListItem: React.FC<ListItemProps> = ({ title }) => {
  return (
    <div className="flex w-full gap-x-10 p-3 rounded-md justify-between items-center bg-[#618e809e]">
      <p>{title}</p>
      <FaArrowRight />
    </div>
  );
};

export default ListItem;
