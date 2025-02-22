import mongoose from "mongoose";

const cityFireSationSchema = new mongoose.Schema({
  fireDistrict: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  fireSubStations: [{ type: String }],
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
