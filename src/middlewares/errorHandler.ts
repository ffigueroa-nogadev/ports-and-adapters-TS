import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import { ValidateError } from "tsoa";
import { AppError } from "./customErrors";

export const errorHandler = (
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void => {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  
  if (err instanceof AppError) {
    res.status(err.statusCode).json({statusCode: err.statusCode, message: err.message});
  }

  if (err instanceof Error) {
    console.log({err});
    
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
}