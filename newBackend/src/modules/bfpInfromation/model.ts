import mongoose from "mongoose";

const bfpInformationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dateEnteredGovernmentService: {
      type: Date,
      required: [true, "Date entered government service is required"],
    },
    dateEnteredUniformedServiceToOtherGovernmentAgency: {
      type: Date,
    },
    dateEnteredUniformedFireService: {
      type: Date,
    },
    dateOfLastPromotionTemporary: {
      type: Date,
    },
    dateOfLastPromotionPermanent: {
      type: Date,
    },
    dateAssumedOfficer: {
      type: Date,
    },
    lastTrainingDate: {
      type: Date,
      required: [true, "Last training date is required"],
    },
    baseCourse: {
      type: String,
      required: [true, "Base course is required"],
    },
    graduateStudies: {
      type: String,
    },
    highestEducationalAttainment: {
      type: String,
      required: [true, "Highest educational attainment is required"],
    },
    eligibilityType: {
      type: String,
      required: [true, "Eligibility is required"],
    },
    highestEligibility: {
      type: String,
      required: [true, "Highest eligibility is required"],
    },
    highestMandatoryTraining: {
      type: String,
      required: [true, "Highest mandatory training is required"],
    },
    itemNumber: {
      type: String,
      required: [true, "Item number is required"],
    },
    appointmentStatus: {
      type: String,
      required: [true, "Appointment Status is required"],
    },
    salaryGrade: {
      type: String,
      required: [true, "Salary grade is required"],
    },
    dutyStatus: {
      type: String,
      required: [true, "Duty status is required"],
    },
    retirementDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

bfpInformationSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const BfpInformation = mongoose.model("BfpInformation", bfpInformationSchema);

export default BfpInformation;
