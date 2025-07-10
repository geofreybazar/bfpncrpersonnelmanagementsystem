import mongoose from "mongoose";

const AmbulanceSchema = new mongoose.Schema(
  {
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
    brand: { type: String, required: true },
    yearAcquired: { type: String, required: true },
    callsign: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

AmbulanceSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Ambulance = mongoose.model("Ambulance", AmbulanceSchema);

export default Ambulance;
