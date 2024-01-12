import jwt from "jsonwebtoken";
import { tokenGenerate } from "../constants/data";
import { generateError } from "../libs/handlers/errorsHandlers";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import { Request } from "express";
class JwtServices {
  public generatePairToken(input: tokenGenerate) {
    const secret_key =
      process.env.SECRET_KEY || "rvGx7efcLKUVL6uK8MgR7X6cpFLUP9vg";

    const accessToken = jwt.sign(input, secret_key, {
      subject: input.id,
      expiresIn: 60 * 60 * 10000,
      algorithm: "HS256",
    });
    const refreshToken = jwt.sign(input, secret_key, {
      subject: input.id,
      expiresIn: 60 * 60 * 10000,
      algorithm: "HS256",
    });
    return { accessToken, refreshToken };
  }
  public verifyToken(token: string) {
    const secret_key =
      process.env.SECRET_KEY || "rvGx7efcLKUVL6uK8MgR7X6cpFLUP9vg";
    try {
      const payload = jwt.verify(token, secret_key);
      return payload;
    } catch (err) {
      console.log(err);
      throw generateError("Token not valid", HttpStatusCodes.FORBIDDEN);
    }
  }
  public getUidFromCookie(req: Request) {
    const uid = req.header("uid");
    if (!uid) {
      throw generateError(
        "You are not authenticated",
        HttpStatusCodes.UNAUTHORIZED
      );
    }
    return uid;
  }
  public isTokenExpired(token: string) {
    try {
      const secret_key =
        process.env.SECRET_KEY || "rvGx7efcLKUVL6uK8MgR7X6cpFLUP9vg";
      const decodedToken: any = jwt.verify(token, secret_key);

      if (decodedToken) {
        const currentTimeInSeconds = Date.now() / 1000;

        if (decodedToken.exp && decodedToken.exp > currentTimeInSeconds) {
          return false;
        }
      }

      return true;
    } catch (error) {
      return true;
    }
  }
}
export default new JwtServices();
