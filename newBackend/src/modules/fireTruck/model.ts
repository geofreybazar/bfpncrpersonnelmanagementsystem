import mongoose from "mongoose";

const FireTruckSchema = new mongoose.Schema({
  subStationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FireSubStation",
  },
  cityStationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FireSubStation",
  },
  districtStationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FireSubStation",
  },
  engineType: {
    type: String,
    required: true,
  },
  brand: { type: String, required: true },
  waterCapacity: { type: String, required: true },
  yearAcquired: { type: String, required: true },
  callsign: { type: String, required: true, unique: true },
});

FireTruckSchema.set(
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

const FireTruck = mongoose.model("FireTruck", FireTruckSchema);

export default FireTruck;
