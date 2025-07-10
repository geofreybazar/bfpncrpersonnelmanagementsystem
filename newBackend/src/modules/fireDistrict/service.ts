import FireDistrict from "./model";

const addFireDistrictService = async (name: string) => {
  if (!name) {
    const error: any = new Error("Name is required");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const mewFireDistrict = await FireDistrict.create({
    name,
  });

  return mewFireDistrict;
};

const getAllFireDistrictService = async () => {
  const fireDistricts = await FireDistrict.find();
  return fireDistricts;
};

const getFireDistrictService = async (id: string) => {
  if (!id) {
    const error: any = new Error("Id is required");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const fireDistrict = await FireDistrict.findById(id);
  if (!fireDistrict) {
    const error: any = new Error("Failed to find Fire Distrit");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }
  return fireDistrict;
};

export default {
  addFireDistrictService,
  getAllFireDistrictService,
  getFireDistrictService,
};
