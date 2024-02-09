import React from "react";
import { PiArrowLeftLight } from "react-icons/pi";
import { PiArrowRight } from "react-icons/pi";

export function RightArrow() {
  return (
    <button className="">
      <PiArrowRight className="text-[25px]" />
    </button>
  );
}

export function LeftArrow() {
  return (
    <button className=" ml-[20px] hover:bg-black borded-none flex items-center justify-center rounded-full w-[40px] h-[40px] transition duration-500">
      <PiArrowLeftLight className="text-[25px]" />
    </button>
  );
}
