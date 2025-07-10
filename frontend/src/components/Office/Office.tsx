import React, { lazy, useState } from "react";
import { Suspense } from "react";

import TabContext from "@mui/lab/TabContext";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TabPanel from "@mui/lab/TabPanel";

import useGetAllFireDistricts from "../../hooks/useGetAllFireDistricts";
import { Skeleton } from "@mui/material";

const TabMain = lazy(() => import("./TabMain"));

const Station = () => {
  const [value, setValue] = useState(0);

  const { fireDistricts, isLoadingGetFireDistricts } = useGetAllFireDistricts();

  const fireDistrictsNames = fireDistricts.map((item, index) => ({
    name: item.name,
    value: index,
    id: item.id,
  }));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (isLoadingGetFireDistricts) {
    return <p> Loading...</p>;
  }

  return (
    <div className="w-full h-full flex flex-col ">
      <p className="text-xl font-semibold py-2">Offices</p>
      <div className="w-full h-full flex flex-col border">
        <div className="flex-1 overflow-hidden shadow-md">
          <TabContext value={value}>
            <div className="flex flex-col h-full">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Station tabs"
              >
                {fireDistrictsNames.map((item, index) => (
                  <Tab key={index} label={item.name} value={item.value} />
                ))}
              </Tabs>
              <div className="flex-grow overflow-auto">
                {fireDistrictsNames.map((item, index) => (
                  <TabPanel
                    key={index}
                    value={item.value}
                    sx={{
                      paddingLeft: 0,
                      paddingBottom: 0,
                      paddingRight: 0,
                      height: "100%",
                    }}
                  >
                    <Suspense
                      fallback={
                        <Skeleton
                          variant="rectangular"
                          width="50%"
                          height={50}
                        />
                      }
                    >
                      <TabMain id={item.id} />
                    </Suspense>
                  </TabPanel>
                ))}
              </div>
            </div>
          </TabContext>
        </div>
      </div>
    </div>
  );
};

export default Station;
