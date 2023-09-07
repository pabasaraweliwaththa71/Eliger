import React, { lazy, useState, useEffect, useCallback } from "react";
import axios from "axios";
const Paginations = lazy(() => import("../Admin/Paginations"));

const ViewMyDrivers = () => {
  const [tableData, setTableData] = useState(null);
  const [pagesCount, setPagesCount] = useState(0);

  // session management function
  const fetch = useCallback(() => {
    setTableData(null);
    axios
      .post("/load_new_reg")
      .then((response) => {
        if (response.data.length !== 0) {
          setTableData(response.data);
          setPagesCount(Math.ceil(response.data.length / 15));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // session function run in component mount
  useEffect(() => {
    fetch();
  }, [fetch]);
  return (
    <div className="h-full w-full flex flex-col">
      <div className="pb-5 text-center text-xl font-medium md:text-2xl">
        View My Drivers
      </div>
      <div className="hidden rounded-t-md bg-gray-400 px-4 py-2 ring-[0.5px] ring-gray-400 dark:bg-gray-700 dark:ring-gray-600 md:flex">
        <div className="w-full text-center">
          <span className="">Driver Name</span>
        </div>
        <div className="w-full text-center">
          <span className="">Email</span>
        </div>
        <div className="w-full text-center">
          <span className="">Option</span>
        </div>
      </div>
      {tableData === null && (
        <p className="mt-4 w-full text-center text-sm font-medium italic">
          No Data Found
        </p>
      )}
      {tableData !== null &&
        tableData.map((data, i) => {
          return (
            <div
              key={i}
              className="text-md group flex flex-col justify-center space-y-2 rounded-sm bg-white ring-[0.5px] ring-gray-400 hover:bg-gray-200 dark:bg-slate-950 dark:ring-gray-600 dark:hover:bg-gray-800 md:flex-row md:items-center md:justify-between md:space-y-0"
            >
              <p className="flex w-full truncate bg-slate-100 px-4 py-2.5  group-hover:bg-gray-200 dark:bg-slate-900 group-hover:dark:bg-gray-800">
                <span className="block md:hidden">
                  Vehicle Plate Number :&ensp;
                </span>
                {data?.Owner_firstname}
              </p>
              <p className="flex w-full truncate px-4 py-2 ">
                <span className="block md:hidden">Vehicle Type :&ensp;</span>
                {data?.Vehicle_type}
              </p>
              <div className="flex w-full justify-end bg-slate-100 px-4 py-2 group-hover:bg-gray-200 dark:bg-slate-900 group-hover:dark:bg-gray-800 md:justify-center">
                <button className="rounded-md bg-sky-500 px-8 py-0.5 font-medium text-white duration-300 ease-in hover:bg-sky-700">
                  View
                </button>
              </div>
            </div>
          );
        })}
      <Paginations totpages={pagesCount} />
    </div>
  );
};
export default ViewMyDrivers;
