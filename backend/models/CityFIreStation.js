import mongoose from "mongoose";

const cityFireSationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  district: { type: String, required: true },
});

cityFireSationSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const CityFireSation = mongoose.model("CityFireSation", cityFireSationSchema);

export default CityFireSation;
