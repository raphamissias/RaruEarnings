import { Request, Response, NextFunction } from "express";
import z, { ZodError } from "zod";

class AppError extends Error {
    message: string
    statusCode: number

    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
};

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    if (err instanceof ZodError) {

        if (z.flattenError(err).formErrors.length > 0) {
            
            return res.status(400).json({"message": z.flattenError(err).formErrors});
        }

        return res.status(400).json(z.flattenError(err).fieldErrors);
    }

    console.error(err);
    return res.status(500).json({ message: "Internal Server Error." });
};

export { AppError, errorHandler };