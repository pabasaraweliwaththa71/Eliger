import React, { lazy, useEffect } from "react";
import topics from "../components/Data/adminsidebarData";
import AccountOption from "../components/Data/AdminGraph/AccountOption";
import VehicleOption from "../components/Data/AdminGraph/VehicleOption";
const HeaderSecondary = lazy(() =>
  import("../components/common/HeaderSecondary")
);
const FooterSecondary = lazy(() =>
  import("../components/common/FooterSecondary")
);
const BackgroundEffect = lazy(() =>
  import("../components/common/BackgroundEffect")
);
const SideBar = lazy(() => import("../components/common/SideBar"));
const BarGraph = lazy(() => import("../components/common/BarGraph"));

const Admindashboard = () => {
  // account chart
  const accountsData = {
    labels: ["Vehicle Owner", "Customer", "Driver"],
    datasets: [
      {
        data: [10, 23, 16],
        borderWidth: 0,
        borderRadius: 5,
        backgroundColor: "#059669",
      },
      {
        data: [20, 43, 12],
        borderWidth: 0,
        borderRadius: 5,
        backgroundColor: "#ea580c",
      },
    ],
  };
  // vehicle chart
  const vehicleData = {
    labels: ["Cars", "Van", "Tuk Tuk", "Bike"],
    datasets: [
      {
        data: [10, 23, 12, 12],
        borderWidth: 0,
        borderRadius: 5,
        backgroundColor: "#d61c4e",
      },
      {
        data: [14, 18, 27, 10],
        borderWidth: 0,
        borderRadius: 5,
        backgroundColor: "#2d4059",
      },
    ],
  };

  // percentages - account type vs amount
  const accTypePercentage = [
    { percentage: 24.76, isPositive: true },
    { percentage: 28.76, isPositive: false },
    { percentage: 116.76, isPositive: true },
  ];

  const vehicleTypePercentage = [
    { percentage: 24.76, isPositive: true },
    { percentage: 28.76, isPositive: false },
    { percentage: 116.76, isPositive: true },
    { percentage: 30.7, isPositive: false },
  ];

  useEffect(() => {});
  return (
    <React.Fragment>
      {/* container */}
      <div className="relative flex h-full w-screen flex-col items-center">
        {/* bluer effect */}
        <BackgroundEffect />
        <HeaderSecondary />
        {/* Content-Area */}
        <div className="flex w-screen flex-col lg:h-screen lg:flex-row lg:overflow-hidden">
          {/* Side Bar Area */}
          <div className="w-full min-w-max lg:h-screen lg:max-w-xs">
            <SideBar title={"Administrator"} dataset={topics} />
          </div>

          {/* Body Area */}
          <div className="relative flex w-full flex-col justify-between px-5 pt-4 lg:min-h-screen lg:overflow-y-auto lg:pt-20">
            {/* heading */}
            <div className="">
              <h1 className="my-3 px-3 font-ABeeZee text-2xl font-semibold">
                New Registrations
              </h1>
              {/*Two Graphs*/}
              <div className="flex h-auto flex-col xl:flex-row">
                {/* graph 1 */}
                <div className="flex w-full justify-center xl:w-1/2">
                  <BarGraph
                    options={AccountOption}
                    data={accountsData}
                    title={"Acount Type Vs Amount"}
                    percentages={accTypePercentage}
                  />
                </div>

                {/* graph 2 */}
                <div className="flex w-full justify-center xl:w-1/2">
                  <BarGraph
                    options={VehicleOption}
                    data={vehicleData}
                    title={"Vehicle Type Vs Amount"}
                    percentages={vehicleTypePercentage}
                  />
                </div>
              </div>
              {/*vehicle registration*/}
              <div className="h-auto w-full px-5">
                <div className="border border-slate-500 p-1 pb-4 pt-4 text-center text-2xl">
                  New Vehicle Registrations
                </div>
              </div>
            </div>
            {/* footer */}
            <div className="relative">
              <FooterSecondary />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Admindashboard;
