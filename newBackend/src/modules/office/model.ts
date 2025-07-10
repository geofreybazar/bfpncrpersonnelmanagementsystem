import mongoose from "mongoose";

const officeSchema = new mongoose.Schema(
  {
    fireDistrictId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FireDistrict",
    },
    cityFireStationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CityFireSation",
    },
    officeName: { type: String, required: true, unique: true },
    headOfOffice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    personnel: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

officeSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Office = mongoose.model("Office", officeSchema);

export default Office;
