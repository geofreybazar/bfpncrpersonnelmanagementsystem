import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    required: true,
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
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  passwordHash: String,
  district: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  office: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verificationCode: String,
  photoInfo: {
    url: String,
    filename: String,
  },
  eSignature: {
    url: String,
    filename: String,
  },
  refreshTokens: [],
});

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = mongoose.model("User", userSchema);

export default User;
