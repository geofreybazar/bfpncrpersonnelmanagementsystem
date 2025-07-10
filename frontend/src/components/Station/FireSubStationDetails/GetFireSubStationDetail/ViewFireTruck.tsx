import React from "react";

interface ViewFireTruckProps {
  selectedFireTruck: string | null;
}

const ViewFireTruck: React.FC<ViewFireTruckProps> = ({ selectedFireTruck }) => {
  return <div>{selectedFireTruck}</div>;
};

export default ViewFireTruck;
