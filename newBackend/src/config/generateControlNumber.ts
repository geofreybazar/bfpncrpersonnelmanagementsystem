import Applications from "../modules/applications/model";
import dayjs from "dayjs";

export const generateControlNumber = async () => {
  const year = dayjs().year();

  let controlNumber;
  const applications = await Applications.find({});
  if (applications.length === 0) {
    controlNumber = `BFPNCR-${year}-0001`;
    return controlNumber;
  }
  const ids = applications.map((c) => c.controlNumber);
  const highestNumber = ids
    .map((doc) => doc.split("-")[2])
    .reduce((max, current) => (current > max ? current : max));
  const newControlNumber = parseInt(highestNumber, 10) + 1;
  const paddedResult = newControlNumber
    .toString()
    .padStart(highestNumber.length, "0");

  controlNumber = `BFPNCR-${year}-${paddedResult}`;
  return controlNumber;
};
