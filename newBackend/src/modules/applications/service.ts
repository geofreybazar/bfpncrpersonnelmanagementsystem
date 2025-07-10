import Applications from "./model";
import { ApplicationFilterType } from "./interface";
import {
  GetApplicationsType,
  getApplicationsSchema,
  GetApplicationType,
  getApplicationSchema,
} from "./validation";

const getApplicationsService = async (body: GetApplicationsType) => {
  if (!body || !getApplicationsSchema.safeParse(body).success) {
    const error: any = new Error("Invalid query");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const { fireDistrict, rank, cityFireStation, searchTerm } = body;

  const limit = parseInt(body.rows, 10);
  const skip = parseInt(body.page.toString(), 10) * limit;

  const filter: ApplicationFilterType = {};
  if (fireDistrict) filter.district = fireDistrict;
  if (rank) filter.rank = rank;
  if (cityFireStation) filter.city = cityFireStation;

  const search = searchTerm ? searchTerm : "";

  const applications = await Applications.find({
    $and: [
      {
        $or: [
          { accountNumber: { $regex: new RegExp(search, "i") } },
          { lastName: { $regex: new RegExp(search, "i") } },
        ],
      },
      filter,
    ],
  })
    .skip(skip)
    .limit(limit);

  const applicationsLength = await Applications.countDocuments({
    $and: [
      {
        $or: [
          { controlNumber: { $regex: new RegExp(search, "i") } },
          { accountNumber: { $regex: new RegExp(search, "i") } },
          { lastName: { $regex: new RegExp(search, "i") } },
        ],
      },
      filter,
    ],
  });

  return { applications, applicationsLength };
};

const getApplicationService = async (id: GetApplicationType) => {
  if (!id || !getApplicationSchema.safeParse(id).success) {
    const error: any = new Error("Invalid data");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const application = await Applications.findById(id);
  if (!application) {
    const error: any = new Error("Case not found!");
    error.name = "ValidationError";
    error.status = 401;
    throw error;
  }
  return application;
};

export default {
  getApplicationsService,
  getApplicationService,
};
