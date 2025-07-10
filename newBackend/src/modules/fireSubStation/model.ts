import mongoose from "mongoose";

const FireSubStationSchema = new mongoose.Schema(
  {
    fireDistrictId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FireDistrict",
    },
    cityFireStationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CityFireSation",
    },
    name: { type: String, required: true, unique: true },
    location: {
      lat: { type: String, required: true },
      long: { type: String, required: true },
    },
    fireTrucks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FireTruck",
      },
    ],
    ambulances: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ambulance",
      },
    ],
  },
  { timestamps: true }
);

FireSubStationSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const FireSubStation = mongoose.model("FireSubStation", FireSubStationSchema);

export default FireSubStation;
