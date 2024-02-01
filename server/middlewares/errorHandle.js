import httpStatusCode from "../utils/httpStatusCode.js";

//Not found
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(httpStatusCode.Not_Found);
  next(error);
};

//If originalURL not found will be next to errorHandle function below
//Error Handle
export const errorHandle = (err, req, res, next) => {
  const statusCode = res.statusCode == httpStatusCode.OK ? httpStatusCode.Internal_Server_Error : res.statusCode;
  res.status(statusCode).json({
    message: err?.message,
    stack: err?.stack
  });
};
