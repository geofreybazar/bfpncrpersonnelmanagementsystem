import mongoose from "mongoose";

const personalinformationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dateOfBirth: Date,
    placeOfBirth: String,
    sex: {
      type: String,
      enum: ["Male", "Female"],
    },
    civilStatus: {
      type: String,
      enum: ["Single", "Married", "Annulled", "Widowed", "Separated", "Others"],
    },
    citizenship: String,
    height: Number,
    weight: Number,
    bloodType: String,
    gsisIdNo: String,
    pagIbigNo: String,
    philHealthNo: String,
    sssNo: String,
    tinNo: String,
    religion: String,
    residentialAddress: {
      houseBlockLotNo: String,
      street: String,
      subdivisionVillage: String,
      barangay: String,
      cityMunicipality: String,
      province: String,
      zipcode: String,
    },
    permanentAddress: {
      houseBlockLotNo: String,
      street: String,
      subdivisionVillage: String,
      barangay: String,
      cityMunicipality: String,
      province: String,
      zipcode: String,
    },
    telephoneNo: String,
    mobileNo: String,
  },
  { timestamps: true }
);

personalinformationSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Personalinformation = mongoose.model(
  "Personalinformation",
  personalinformationSchema
);

export default Personalinformation;
