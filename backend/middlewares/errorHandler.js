export default function errorHandler(error, req, res, next) {
  if (error.name === "CastError") {
    return res.status(400).json({ message: "Malformated ID" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    return res.status(400).json({ error: "token expired" });
  } else if (error.name === "MongoServerError" && error.code === 11000) {
    const duplicatedField = Object.keys(error.keyValue)[0];
    return res
      .status(400)
      .json({ error: `${duplicatedField} is already registered` });
  }
  next(error);
}
