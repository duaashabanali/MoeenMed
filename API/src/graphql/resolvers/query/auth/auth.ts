import { Login } from "../../../../database/auth/login";
import jwt from "jsonwebtoken";
import yenv from "yenv";
import bcrypt from "bcrypt";
import { dataLoaders } from "../../dataloaders"; 
import { GraphQLContext } from "../../../utility/graphql";
const env = yenv("env.yaml", { env: "development" });

export const loginResolver = async (
  _: any,
  { email, password }: { email: string; password: string }
) => {
  let login!: Login;
  let isPasswordMatch;
  let _userId!: string;
  const returnVal: any = {};
  // Convert loginName to lowercase
  const lowercaseLoginName = email.toLowerCase();
  if (email && password) {
    login = (await Login.findOneBy({ email: lowercaseLoginName })) as Login;
    if (login) {
      isPasswordMatch = await bcrypt.compare(password, login.password);
    }
    if (!login || !isPasswordMatch) {
      throw new Error(`Email and password do not match`);
    }
    _userId = login.id;
  }
  const rootUser = await dataLoaders.userLoader.clear(_userId).load(_userId);
  returnVal.token = await generateToken(rootUser);
  returnVal.info = rootUser;

  return returnVal;
};

// function for genrate token
export const generateToken = async (login: Login) => {
  const tokenPayload = {
    id: login.id,
    email: login.email,
  };
  const now = new Date();
  const nowInSeconds = Math.round(now.getTime() / 1000);
  const exp = in1Day(nowInSeconds);
  const secret = env.JWT_SECRET;
  const token = jwt.sign(
    {
      ...tokenPayload,
      iat: nowInSeconds,
      exp,
    },
    secret
  );

  return { token };
};
const secondsPerDay = 86400;
const in1Day = (nowInSeconds: number): number => {
  return nowInSeconds + secondsPerDay;
};

// get user profile
export const getUserProfile = async (_: any, __: any, { userId }: GraphQLContext) => {  
  const user = await dataLoaders.userLoader.clear(userId).load(userId)
  return user;
};
