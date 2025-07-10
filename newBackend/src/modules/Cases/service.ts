import mongoose from "mongoose";
import Cases from "./model";
import User from "../adminUsers/model";
import Approver from "../Approver/model";
import Applications from "../applications/model";
import { generateControlNumber } from "../../config/generateControlNumber";
import generateIasClearance from "../../config/generateIasClearance";
import { PersonnelType } from "../adminUsers/validation";
import {
  GetCasesType,
  getCasesSchema,
  getCaseSchema,
  GetCaseType,
  addCaseSchema,
  AddCaseType,
  updateCaseIdSchema,
  UpdateCaseIdType,
  deleteCaseSchema,
  DeleteCaseType,
  generateClearanceSchema,
  GenerateClearanceType,
  FilterCaseType,
} from "./validation";
import dayjs from "dayjs";

const getCasesService = async (filters: GetCasesType) => {
  if (!filters || !getCasesSchema.safeParse(filters).success) {
    const error: any = new Error("Invalid data");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const page = parseInt(filters.page, 10) + 1;
  const limit = parseInt(filters.rows, 10);

  const skip = (page - 1) * limit;

  const cases = await Cases.find({})
    .populate("personComplainedUserId", {
      rank: 1,
      firstName: 1,
      middleName: 1,
      lastName: 1,
      accountNumber: 1,
      suffix: 1,
    })
    .skip(skip)
    .limit(limit);

  if (!cases) {
    const error: any = new Error("No cases found!");
    error.name = "ValidationError";
    error.status = 404;
    throw error;
  }

  const casesLength = await Cases.countDocuments({});

  return { cases, casesLength };
};

const getAllCasesService = async () => {
  const cases = await Cases.find({});
  if (!cases) {
    const error: any = new Error("No cases found!");
    error.name = "ValidationError";
    error.status = 404;
    throw error;
  }

  return cases;
};

const getCaseService = async (id: GetCaseType) => {
  if (!id || !getCaseSchema.safeParse(id).success) {
    const error: any = new Error("Invalid data");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const caseGet = await Cases.findById(id).populate("personComplainedUserId", {
    rank: 1,
    firstName: 1,
    middleName: 1,
    lastName: 1,
    accountNumber: 1,
    suffix: 1,
  });

  if (!caseGet) {
    const error: any = new Error("Case not found!");
    error.name = "ValidationError";
    error.status = 401;
    throw error;
  }
  return caseGet;
};

const addCaseService = async (body: AddCaseType) => {
  if (!body || !addCaseSchema.safeParse(body).success) {
    const error: any = new Error("Invalid data");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const newCase = await Cases.create(body);

  return newCase;
};

const updateCaseService = async (id: UpdateCaseIdType, body: AddCaseType) => {
  if (!id || !updateCaseIdSchema.safeParse(id).success) {
    const error: any = new Error("Missing case ID in params");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const updatedCaseData = {
    complainant: body.complainant,
    natureOfOffense: body.natureOfOffense,
    dateFilled: body.dateFilled,
    personComplainedUserId: body.personComplainedUserId,
    accountCode: body.accountCode,
    unit: body.unit,
    region: body.region,
    status: body.status,
    actionTaken: body.actionTaken,
    remarks: body.remarks,
    investigator: body.investigator,
  };

  const caseData = await Cases.findByIdAndUpdate(id, updatedCaseData, {
    new: true,
    runValidators: true,
    context: "query",
  });

  if (!caseData) {
    const error: any = new Error("Case not found");
    error.name = "ValidationError";
    error.status = 404;
    throw error;
  }

  return caseData;
};

const deleteCaseService = async (id: DeleteCaseType) => {
  if (!id || !deleteCaseSchema.safeParse(id).success) {
    const error: any = new Error("Missing case ID in params.");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const caseToDelete = await Cases.findByIdAndDelete(id);
  if (!caseToDelete) {
    const error: any = new Error("Case not found.");
    error.name = "ValidationError";
    error.status = 404;
    throw error;
  }
  return caseToDelete;
};

const generateClearanceService = async (body: GenerateClearanceType) => {
  if (!body || !generateClearanceSchema.safeParse(body).success) {
    const error: any = new Error("Invalid data");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const personnel = await User.findById(body.id);

  if (!personnel) {
    const error: any = new Error("Personnel not found!");
    error.name = "AuthenticationError";
    error.status = 500;
    throw error;
  }

  let pendingCaseStatus;

  const activeCase = await Cases.find({
    personComplainedUserId: personnel.id,
    status: { $nin: ["Case Closed", "Case dismissed"] },
  });

  if (activeCase.length !== 0) {
    pendingCaseStatus = "With Pending Case";
  } else {
    pendingCaseStatus = "Without Pending Case";
  }

  const approver = await Approver.findOne({ system: "eias" }).populate(
    "userId",
    {
      rank: 1,
      firstName: 1,
      middleName: 1,
      lastName: 1,
      suffix: 1,
    }
  );

  if (!approver || !approver.userId) {
    const error: any = new Error("Approver not found!");
    error.name = "AuthenticationError";
    error.status = 500;
    throw error;
  }
  const user = approver.userId as unknown as PersonnelType;
  const { firstName, middleName, lastName, suffix, rank } = user;

  const approverName = `${firstName} ${middleName?.[0] || ""} ${lastName} ${
    suffix || ""
  }`;

  const approverRank = rank;
  const controlNumber = await generateControlNumber();
  const pdfDoc = generateIasClearance(
    body.purpose,
    personnel,
    approverName,
    approverRank,
    pendingCaseStatus,
    controlNumber
  );

  await Applications.create({
    controlNumber: controlNumber,
    rank: personnel.rank,
    firstName: personnel.firstName,
    middleName: personnel.middleName,
    lastName: personnel.lastName,
    suffix: personnel.suffix,
    accountNumber: personnel.accountNumber,
    assignment: personnel.assignment,
    reveals: pendingCaseStatus,
    purpose: body.purpose,
    district: personnel.district,
    city: personnel.city,
    issuedOn: dayjs(),
  });

  return pdfDoc;
};

const setEiasApproverService = async (id: string) => {
  if (!id) {
    const error: any = new Error("Missing case ID in params.");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }
  const objectId = new mongoose.Types.ObjectId(id);
  const approver = await Approver.findOne({ system: "eias" });

  if (!approver) {
    const setApprover = await Approver.create({
      userId: id,
      system: "eias",
    });
    return setApprover;
  } else {
    approver.userId = objectId;
    const updatedApprover = await approver.save();
    return updatedApprover;
  }
};

const getIasApproverService = async () => {
  const iasApprover = await Approver.findOne({ system: "eias" }).populate(
    "userId",
    {
      rank: 1,
      firstName: 1,
      middleName: 1,
      lastName: 1,
      suffix: 1,
      accountNumber: 1,
    }
  );
  if (!iasApprover) {
    const error: any = new Error("Missing case ID in params.");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  return iasApprover;
};

const filterCaseService = async (body: FilterCaseType) => {
  const { status, fireDistrict, rank, cityFireStation, searchTerm } = body;

  const limit = parseInt(body.rows, 10);
  const skip = parseInt(body.page.toString(), 10) * limit;

  const matchConditions: any = {};

  if (status) matchConditions.status = status;
  if (fireDistrict)
    matchConditions["personComplainedUser.district"] = fireDistrict;
  if (rank) matchConditions["personComplainedUser.rank"] = rank;
  if (cityFireStation)
    matchConditions["personComplainedUser.city"] = cityFireStation;

  if (searchTerm) {
    matchConditions.$or = [
      {
        "personComplainedUser.accountNumber": {
          $regex: searchTerm,
          $options: "i",
        },
      },
      {
        "personComplainedUser.lastName": { $regex: searchTerm, $options: "i" },
      },
    ];
  }

  const result = await Cases.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "personComplainedUserId",
        foreignField: "_id",
        as: "personComplainedUser",
      },
    },
    { $unwind: "$personComplainedUser" },
    { $match: matchConditions },
    {
      $facet: {
        searchedCases: [
          { $skip: skip },
          { $limit: limit },
          {
            $project: {
              id: "$_id",
              _id: 0,
              status: 1,
              caseNumber: 1,
              createdAt: 1,
              updatedAt: 1,
              complainant: 1,
              natureOfOffense: 1,
              dateFilled: 1,
              accountCode: 1,
              unit: 1,
              region: 1,
              actionTaken: 1,
              remarks: 1,
              investigator: 1,
              personComplainedUserId: {
                id: "$personComplainedUser._id",
                rank: "$personComplainedUser.rank",
                firstName: "$personComplainedUser.firstName",
                middleName: "$personComplainedUser.middleName",
                lastName: "$personComplainedUser.lastName",
                accountNumber: "$personComplainedUser.accountNumber",
                district: "$personComplainedUser.district",
                city: "$personComplainedUser.city",
                officeOrStation: "$personComplainedUser.officeOrStation",
              },
            },
          },
        ],
        searchedCasesLength: [{ $count: "count" }],
      },
    },
  ]);

  const cases = result[0]?.searchedCases || [];
  const casesLength = result[0]?.searchedCasesLength?.[0]?.count || 0;

  return {
    cases,
    casesLength,
  };
};

export default {
  getCasesService,
  getAllCasesService,
  getCaseService,
  addCaseService,
  updateCaseService,
  deleteCaseService,
  generateClearanceService,
  setEiasApproverService,
  getIasApproverService,
  filterCaseService,
};
