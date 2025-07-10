import mongoose from "mongoose";

const ApplicationsSchema = new mongoose.Schema(
  {
    controlNumber: { type: String, required: true, unique: true },
    rank: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
    suffix: {
      type: String,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    assignment: { type: String, required: true },
    reveals: { type: String, required: true },
    purpose: { type: String, required: true },
    issuedOn: { type: Date, required: true },
  },
  { timestamps: true }
);

ApplicationsSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Applications = mongoose.model("Applications", ApplicationsSchema);

export default Applications;
