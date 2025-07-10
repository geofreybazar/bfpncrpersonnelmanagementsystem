import mongoose from "mongoose";

const CasesSchema = new mongoose.Schema(
  {
    caseNumber: { type: String, required: true },
    complainant: { type: String, required: true },
    natureOfOffense: { type: String, required: true },
    dateFilled: { type: String, required: true },
    personComplainedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    accountCode: { type: String, required: true },
    unit: { type: String, required: true },
    region: { type: String, required: true },
    status: { type: String, required: true },
    actionTaken: { type: String, required: true },
    remarks: { type: String, required: true },
    investigator: { type: String, required: true },
  },
  { timestamps: true }
);

CasesSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Cases = mongoose.model("Cases", CasesSchema);

export default Cases;
