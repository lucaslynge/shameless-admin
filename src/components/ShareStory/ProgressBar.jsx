import Image from "next/image";
import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="flex gap-4 rounded-md bg-[#F5F6FF] px-5 py-3">
      <div>
        <Image
          src={"/assets/png/checkMark.png"}
          alt=""
          width={41}
          height={40}
        />
      </div>
      <div className="w-full">
        <p className="text-base font-bold">
          {progress}%<span className="text-xs font-normal px-2">Completed</span>
        </p>
        <div className="w-full bg-[#E6E8FC] rounded-full h-1.5 dark:bg-gray-700 mt-1">
          <div
            className="bg-[#7480E7] h-1.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
