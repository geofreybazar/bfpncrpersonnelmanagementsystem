import mongoose from "mongoose";

const ApproverSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    system: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

ApproverSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Approver = mongoose.model("Approver", ApproverSchema);

export default Approver;
