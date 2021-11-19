import { Response } from "express";

// response with error and 401 status code
export const error = (res: Response, message: string, statusCode: number) => {
    res.status(statusCode).json({
        status: 'error',
        message,
    });
}