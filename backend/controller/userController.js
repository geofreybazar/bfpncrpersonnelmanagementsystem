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
  if (body.role === true) {
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
    office: body.office,
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
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  const decodedToken = jwt.verify(refreshToken, config.REFRESH_TOKEN);

  if (!decodedToken) {
    return res.status(401).json("You are not authenticated!");
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
    next(error);
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

export default { addPersonnel, login, generateRefreshToken, getAllPersonnel };
