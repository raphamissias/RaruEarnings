import { IUser } from "../../interfaces/models/users";
import express, { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            user: IUser;
        }
    }
}