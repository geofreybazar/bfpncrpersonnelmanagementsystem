import mongoose from "mongoose";

const childSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
});

const familyBackgroundSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    spouse: {
      surname: String,
      firstName: String,
      middleName: String,
      suffix: String,
      employerName: String,
      businessAddress: String,
      telephoneNumber: String,
    },
    father: {
      surname: {
        type: String,
        required: [true, "Surname is required"],
      },
      firstName: {
        type: String,
        required: [true, "First name is required"],
      },
      middleName: String,
      suffix: String,
    },
    mother: {
      surname: {
        type: String,
        required: [true, "Surname is required"],
      },
      firstName: {
        type: String,
        required: [true, "First name is required"],
      },
      middleName: String,
      suffix: String,
    },
    children: [childSchema],
  },
  {
    timestamps: true,
  }
);

familyBackgroundSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const FamilyBackground = mongoose.model(
  "FamilyBackground",
  familyBackgroundSchema
);

export default FamilyBackground;
