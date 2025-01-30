import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { userRouter } from '../routes/api/user-routes';

interface JwtPayload {
  username: string;
}
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader= req.headers.authorization;
  if ( authHeader ) {
      const token = authHeader.split(' ')[1];
      const secretKey= process.env.JWT_SECRET_KEY || '';
      jwt.verify (token, secretKey, (err, user) => {

        if (err) {

          return res.sendStatus(403)
        
        }
        req.user = user as JwtPayload; //decoded user info is being attached to req object.

        return next()
      }); 


  }else {

    res.sendStatus(401); //checking if authHeader is not authorized
  }
};
