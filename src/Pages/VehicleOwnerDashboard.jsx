import React, { lazy, useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import topics from "../Data/VehicleOwnerSidebarData";

const HeaderSecondary = lazy(() =>
  import("../Components/Common/HeaderSecondary")
);
const FooterSecondary = lazy(() =>
  import("../Components/Common/FooterSecondary")
);
const BackgroundEffect = lazy(() =>
  import("../Components/Common/BackgroundEffect")
);
const SideBar = lazy(() => import("../Components/Common/SideBar"));
const VehicleOwnerGraph = lazy(() =>
  import("../Components/VehicleOwner/VehicleOwnerGraph")
);
const CreateDriverAccount = lazy(() =>
  import("../Components/VehicleOwner/CreateDriverAccount")
);
const ViewMyDrivers = lazy(() =>
  import("../Components/VehicleOwner/ViewMyDrivers")
);
const EditAccount = lazy(() =>
  import("../Components/VehicleOwner/EditAccount")
);
const EditVehicle = lazy(() =>
  import("../Components/VehicleOwner/EditVehicle")
);
const ViewMyVehicles = lazy(() =>
  import("../Components/VehicleOwner/ViewMyVehicles")
);
const AddVehicle = lazy(() => import("../Components/VehicleOwner/AddVehicle"));

const VehicleOwnerDashboard = () => {
  //Component loading state hook
  const [activeComp, setActiveComp] = useState(0);
    const [loadedData, setLoadedData] = useState(null);
    const navigate = useNavigate();

    const loadData = useCallback(async () => {
      await axios
        .post("/get_owner")
        .then((response) => {
          if (response.status === 200 && response.data !== 14) {
            setLoadedData(response.data);
          } else {
            navigate("/login");
          }
        })
        .catch((error) => {
          navigate("/login");
        });
    }, [navigate]);

    useEffect(() => {
      // loadData();
    }, [loadData]);

  const optionComponents = {
    0: <ViewMyVehicles />,
    1: <ViewMyDrivers />,
    2: <AddVehicle />,
    3: <EditVehicle />,
    4: <CreateDriverAccount />,
    5: <EditAccount currentData={loadedData} />,
  };

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
            <SideBar
              title={"Vehicle Owner"}
              dataset={topics}
              setActiveComp={setActiveComp}
              active={activeComp}
            />
          </div>

          {/* Body Area */}
          <div className="relative flex w-full flex-col items-center justify-between px-5 pt-4 md:px-10 lg:min-h-screen lg:overflow-y-auto lg:pt-20">
            {optionComponents[activeComp]}
            {/*graph*/}
            <div className="mt-10 flex w-full justify-center ">
              <VehicleOwnerGraph />
            </div>
            <div className="relative mt-10 w-full">
              <FooterSecondary />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default VehicleOwnerDashboard;
