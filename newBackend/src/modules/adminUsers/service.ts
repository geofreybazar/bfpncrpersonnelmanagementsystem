import Personnel from "./model";
import bcrypt from "bcrypt";
import config from "../../config/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  personnelSchema,
  loginSchema,
  pagesAndRowsSchema,
  PersonnelType,
  LoginType,
  PagesAndRowsType,
  FilterQueryType,
  filterSchema,
  logoutSchema,
  LogoutType,
  AuthencicateUserTokenType,
} from "./validation";
import { PersonnelFilter } from "./interface";
import { AppError } from "../../middlewares/errorHandler";

interface UserPayload extends JwtPayload {
  accountNumber: string;
  id: string;
}

const addPersonnelService = async (body: PersonnelType) => {
  const defaultPassword = "admin123";
  if (!body || !personnelSchema.safeParse(body).success) {
    const error: any = new Error("Invalid user data");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(defaultPassword, saltRounds);

  let role;
  if (body.itAdmin === true) {
    role = "admin";
  } else {
    role = "personnel";
  }

  const personnel = await Personnel.create({
    rank: body.rank,
    firstName: body.firstName,
    middleName: body.middleName,
    lastName: body.lastName,
    suffix: body.suffix,
    accountNumber: body.accountNumber,
    role,
    passwordHash,
    district: body.district,
    city: body.city,
    email: body.email,
    assignment: body.assignment,
    officeOrStation: body.officeOrStation,
  });

  return personnel;
};

const loginService = async (body: LoginType) => {
  if (!body || !loginSchema.safeParse(body).success) {
    const error: any = new Error("Invalid username or password");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const { accountNumber, password } = body;

  const user = await Personnel.findOne({ accountNumber: accountNumber });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!user || !passwordCorrect) {
    const error: AppError = new Error("Invalid username or password");
    error.name = "AuthenticationError";
    error.status = 401;
    throw error;
  }

  const userForToken = {
    accountNumber: user.accountNumber,
    id: user.id,
  };

  const accessToken = jwt.sign(userForToken, config.JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(userForToken, config.REFRESH_TOKEN, {
    expiresIn: "7d",
  });

  await Personnel.findByIdAndUpdate(user._id, {
    $push: { refreshTokens: refreshToken },
  });

  return {
    id: user._id.toString(),
    accessToken,
    refreshToken,
  };
};

const generateRefreshTokenService = async (refreshToken: string) => {
  if (!refreshToken) {
    const error: AppError = new Error("Refresh token not found, Login again");
    error.name = "AuthenticationError";
    error.status = 401;
    throw error;
  }

  const decodedToken = jwt.verify(refreshToken, config.REFRESH_TOKEN);

  if (typeof decodedToken === "string") {
    const error: AppError = new Error("Invalid token payload");
    error.name = "AuthenticationError";
    error.status = 401;
    throw error;
  }

  const user = await Personnel.findById(decodedToken.id);

  if (!user || !user.refreshTokens.includes(refreshToken)) {
    const error: AppError = new Error("Refresh token is not valid");
    error.name = "AuthenticationError";
    error.status = 401;
    throw error;
  }

  const userToken = {
    accountNumber: user.accountNumber,
    id: user.id,
  };

  const newAccessToken = jwt.sign(userToken, config.JWT_SECRET, {
    expiresIn: "15m",
  });

  const newRefreshToken = jwt.sign(userToken, config.REFRESH_TOKEN, {
    expiresIn: "7d",
  });

  await Personnel.findByIdAndUpdate(user._id, {
    $pull: { refreshTokens: refreshToken },
  });

  await Personnel.findByIdAndUpdate(user._id, {
    $push: { refreshTokens: newRefreshToken },
  });

  return { newAccessToken, newRefreshToken };
};

const getAllPersonnelService = async (query: PagesAndRowsType) => {
  if (!query || !pagesAndRowsSchema.safeParse(query).success) {
    const error: any = new Error("Invalid query");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const page = parseInt(query.page, 10) + 1;
  const limit = parseInt(query.rows, 10);

  const skip = (page - 1) * limit;

  const personnel = await Personnel.find({}).skip(skip).limit(limit);
  const personnelLength = await Personnel.countDocuments({});

  return { personnel, personnelLength };
};

const getAllPersonnelNopageService = async () => {
  const personnel = await Personnel.find({});
  return personnel;
};

const updatePersonnelService = async (body: PersonnelType, userId: string) => {
  if (!body || !personnelSchema.safeParse(body).success) {
    const error: any = new Error("Invalid user data");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const editedUser = {
    rank: body.rank,
    firstName: body.firstName,
    middleName: body.middleName,
    lastName: body.lastName,
    suffix: body.suffix,
    accountNumber: body.accountNumber,
    role: body.role,
    district: body.district,
    city: body.city,
    officeOrStation: body.officeOrStation,
    assignment: body.assignment,
    email: body.email,
    itAdmin: body.itAdmin,
  };
  const updatedUser = await Personnel.findByIdAndUpdate(userId, editedUser, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    const error: any = new Error("User not found!");
    error.name = "ValidationError";
    error.status = 404;
    throw error;
  }

  return updatedUser;
};

const getPersonnelService = async (id: string) => {
  const personnel = await Personnel.findById(id);
  if (!personnel) {
    const error: any = new Error("Personnel not found!");
    error.name = "ValidationError";
    error.status = 404;
    throw error;
  }

  return personnel;
};

const filterPersonnel = async (query: FilterQueryType) => {
  if (!query || !filterSchema.safeParse(query).success) {
    const error: any = new Error("Invalid query");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const { fireDistrict, rank, cityFireStation, searchTerm } = query;

  const page = isNaN(parseInt(query.page)) ? 1 : parseInt(query.page, 10);
  const limit = isNaN(parseInt(query.rows)) ? 10 : parseInt(query.rows, 10);

  const skip = (page - 1) * limit;

  const filter: PersonnelFilter = {};
  if (fireDistrict) filter.district = fireDistrict;
  if (rank) filter.rank = rank;
  if (cityFireStation) filter.city = cityFireStation;

  const search = searchTerm || "";
  const searchedPersonnel = await Personnel.find({
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

  const searchedPersonnelLength = await Personnel.countDocuments({
    $and: [
      {
        $or: [
          { accountNumber: { $regex: new RegExp(search, "i") } },
          { lastName: { $regex: new RegExp(search, "i") } },
        ],
      },
      filter,
    ],
  });

  return { searchedPersonnel, searchedPersonnelLength };
};

const removeRefreshToken = async (body: LogoutType) => {
  if (!body || !logoutSchema.safeParse(body).success) {
    const error: any = new Error("Invalid login data");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }
  const { id, refreshToken } = body;

  const user = await Personnel.findById(id);
  if (!user) {
    const error: AppError = new Error("User not found!");
    error.name = "AuthenticationError";
    error.status = 401;
    throw error;
  }
  user.refreshTokens = user.refreshTokens.filter(
    (token) => token !== refreshToken
  );
  await user.save();
};

const authenticateUserTokenService = async (
  query: AuthencicateUserTokenType
) => {
  const { token } = query;

  let decoded: string | JwtPayload;

  try {
    decoded = jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    const error: AppError = new Error("Invalid token or expired");
    error.name = "AuthenticationError";
    error.status = 401;
    throw error;
  }

  if (
    typeof decoded === "object" &&
    "accountNumber" in decoded &&
    "id" in decoded
  ) {
    const user = decoded as UserPayload;
    return user;
  }

  const error: AppError = new Error("Invalid token payload");
  error.name = "AuthenticationError";
  error.status = 401;
  throw error;
};

const getUserTokenService = async (token: string) => {
  if (!token) {
    const error: any = new Error("No token is detected");
    error.name = "AuthenticationError";
    error.status = 500;
    throw error;
  }
  const user = jwt.verify(token, config.JWT_SECRET);

  if (!user) {
    const error: any = new Error("Not authenticated");
    error.name = "AuthenticationError";
    error.status = 500;
    throw error;
  }

  return;
};

export default {
  addPersonnelService,
  loginService,
  generateRefreshTokenService,
  getAllPersonnelService,
  getAllPersonnelNopageService,
  updatePersonnelService,
  getPersonnelService,
  filterPersonnel,
  removeRefreshToken,
  authenticateUserTokenService,
  getUserTokenService,
};
