import mongoose from "mongoose";

const FireDistrictSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  cities: [{ type: String, unique: true }],
});

FireDistrictSchema.set(
  "toJSON",
  {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  },
  { timestamps: true }
);

const FireDistrict = mongoose.model("FireDistrict", FireDistrictSchema);

export default FireDistrict;
