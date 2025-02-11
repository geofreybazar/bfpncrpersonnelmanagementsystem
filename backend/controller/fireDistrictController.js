import FireDistrict from "../models/FireDistrict.js";

const addFireDistrict = async (req, res, next) => {
  console.log("asdasds");
  const name = req.body.name;

  const mewFireDistrict = new FireDistrict({
    name,
  });

  try {
    await mewFireDistrict.save();
    return res.status(201).json(mewFireDistrict);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getFireDistrict = async (req, res, next) => {
  try {
    const fireDistricts = await FireDistrict.find();
    return res.status(200).json(fireDistricts);
  } catch (error) {
    console.log(error);
    next(error);
    return res.status(400);
  }
};

export default {
  addFireDistrict,
  getFireDistrict,
};
