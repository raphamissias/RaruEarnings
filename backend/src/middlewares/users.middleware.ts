import { Request, Response, NextFunction } from "express";
import { UserOmitIdSchema } from "../schemas/user.schema";
import { IUserOmitId } from "../interfaces/models/users";

const validateData = async (req: Request, res: Response, next: NextFunction) => {
    const userInfo: IUserOmitId = UserOmitIdSchema.parse(req.body);

    req.body = userInfo;
        
    next();
}

export { validateData }