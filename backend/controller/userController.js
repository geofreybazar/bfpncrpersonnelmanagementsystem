import bcrypt from "bcrypt";
import config from "../utils/config.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const addPersonnel = async (req, res, next) => {
  const body = req.body;
  const password = "admin123";

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  let role;
  if (body.itAdmin === true) {
    role = "admin";
  } else {
    role = "personnel";
  }

  const user = new User({
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
  });

  try {
    const savedUser = await user.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const body = req.body;

  const accountNumber = body.accountNumber;
  const password = body.password;

  if (accountNumber === "" || password === "") {
    return res.status(401).json({ error: "enter complete credentials" });
  }

  const user = await User.findOne({ accountNumber: accountNumber });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    accountNumber: user.accountNumber,
    id: user._id,
  };

  const token = jwt.sign(userForToken, config.JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(userForToken, config.REFRESH_TOKEN, {
    expiresIn: "7d",
  });
  user.refreshTokens = user.refreshTokens.concat(refreshToken);
  await user.save();

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).send({
    id: user.id,
    accountNumber: user.accountNumber,
  });
};

const generateRefreshToken = async (req, res, next) => {
  const refreshToken = req.cookies.refresh_token;
  console.log("REFRESH");
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(refreshToken, config.REFRESH_TOKEN);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(403)
        .json({ message: "Refresh Token Expired. Please log in again." });
    }
    return res.status(401).json({ message: "Invalid Refresh Token" });
  }

  const user = await User.findById(decodedToken.id);

  if (!user || !user.refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }

  user.refreshTokens = user.refreshTokens.filter(
    (token) => token !== refreshToken
  );

  try {
    const userToken = {
      accountNumber: user.accountNumber,
      id: user._id,
    };
    const newAccessToken = jwt.sign(userToken, config.JWT_SECRET, {
      expiresIn: "15m",
    });
    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({ message: "Token refreshed" });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: "Invalid refresh token" });
  }
};

const getAllPersonnel = async (_, res, next) => {
  try {
    const personnel = await User.find({});
    return res.json(personnel);
  } catch (error) {
    next(error);
  }
};

const updatePersonnel = async (req, res, next) => {
  const body = req.body;

  const userId = req.query.id;

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
    office: body.office,
  };

  const updatedUser = await User.findByIdAndUpdate(userId, editedUser, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    res.status(404).send({ error: "User not found!" });
  }

  try {
    await updatedUser.save();
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
};

const getPersonnel = async (req, res, next) => {
  const userId = req.query.id;
  if (!userId) {
    return res.status(404).json({ message: "No id passed!" });
  }
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ error: "No user found!" });
  }

  return res.status(200).json(user);
};

export default {
  addPersonnel,
  login,
  generateRefreshToken,
  getAllPersonnel,
  updatePersonnel,
  getPersonnel,
};
