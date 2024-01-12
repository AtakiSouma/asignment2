import HttpStatusCodes from "../constants/HttpStatusCodes";
import { loginInput, tokenGenerate } from "../constants/data";
import { generateError } from "../libs/handlers/errorsHandlers";
import { Request, Response, response } from "express";
import { User } from "../models/Users";
import jwtServices from "./jwt.services";
import bcryptModule from "../util/bcryptModule";
import { Token } from "../models/Token";

class AuthService {
  private generateResponse(
    input: tokenGenerate,
    accessToken: string,
    refreshToken: string
  ) {
    if (!input.id || !accessToken || !input.email) {
      throw generateError("Invalid data", HttpStatusCodes.CONFLICT);
    }
    return {
      user: input,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
  private setRefreshToken(res: Response, refreshToken: string, uid: string) {
    res.cookie("refresh_token", refreshToken, {
      domain: "localhost",
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie("uid", uid, {
      domain: "localhost",
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
  public async newToken(id: string, res: Response) {
    const user = await User.findOne({
      _id: id,
    });
    if (!user) {
      throw generateError(
        "You are not authenticated!",
        HttpStatusCodes.UNAUTHORIZED
      );
    }
    const tokenGenerate: tokenGenerate = {
      id: user.id,
      email: user.email,
      username: user.username,
      //  avatar: user.avatar || "https://image.noelshack.com/fichiers/2023/46/2/1699998167-ruanmei-trobelle.png",
    };
    const { accessToken, refreshToken } =
      jwtServices.generatePairToken(tokenGenerate);
    this.setRefreshToken(res, refreshToken, user.id);
    this.setRefreshTokenInDB(user.id, refreshToken);

    return this.generateResponse(tokenGenerate, accessToken, refreshToken);
  }
  public async login(input: loginInput, res: Response) {
    const user = await User.findOne({
      email: input.email,
    });
    // check if user
    if (!user || !user.password) {
      throw generateError("User not found", HttpStatusCodes.UNAUTHORIZED);
    }
    const compare = await bcryptModule.compare(input.password, user.password);
    if (compare) {
      const tokenGenerate: tokenGenerate = {
        id: user.id,
        email: user.email,
        username: user.username,
      };
      const { accessToken, refreshToken } =
        jwtServices.generatePairToken(tokenGenerate);
      this.setRefreshToken(res, refreshToken, user.id);
      this.setRefreshTokenInDB(user.id, refreshToken);
      return this.generateResponse(tokenGenerate, accessToken, refreshToken);
    } else {
      throw generateError("Password not correct", HttpStatusCodes.UNAUTHORIZED);
    }
  }
  public async logout(res: Response) {
    try {
      res.clearCookie("refresh_token");
      return "Logged out successfully";
    } catch (error) {
      throw generateError(
        "Cannot log out",
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  private async setRefreshTokenInDB(userId: string, refreshToken: string) {
    try {
      const user = await User.findOne({ _id: userId });

      if (!user) {
        throw generateError(
          "User is not logged in",
          HttpStatusCodes.UNAUTHORIZED
        );
      }

      const existingToken = await Token.findOne({ user: userId });

      if (existingToken) {
        // If the user already has a token, update it
        existingToken.token = refreshToken;
        await existingToken.save();
      } else {
        // If the user doesn't have a token, create a new one
        await Token.create({
          user: userId,
          token: refreshToken,
        });
      }
    } catch (error) {
      throw generateError(
        "Error saving refresh token",
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async requestRefreshToken(
    req: Request,
    res: Response,
    token: string,
    uid: string
  ) {
    // const oldrefreshToken = req.cookies.refresh_token;
    // const uid = req.cookies.uid;
    // console.log("old", oldrefreshToken);
    // console.log("uid", uid);
    // const refreshData = await Token.findOne({
    //   user: uid,
    //   token: oldrefreshToken,
    // });
    // if (!refreshData) {
    //   throw generateError(
    //     "Invalid refresh token iii",
    //     HttpStatusCodes.UNAUTHORIZED
    //   );
    // }
    // // check expire
    // const isTokenExpired = jwtServices.isTokenExpired(oldrefreshToken);
    // if (isTokenExpired) {
    //   throw generateError(
    //     "Refresh token expired",
    //     HttpStatusCodes.UNAUTHORIZED
    //   );
    // }
    const tokenGenerate: tokenGenerate = {
      id: uid,
    };
    const { accessToken, refreshToken } =
      jwtServices.generatePairToken(tokenGenerate);
    this.setRefreshToken(res, refreshToken, uid);
    this.setRefreshTokenInDB(uid, refreshToken);
    return this.generateResponse(tokenGenerate, accessToken, refreshToken);
  }
}
export default new AuthService();
