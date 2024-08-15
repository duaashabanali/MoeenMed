import { Login } from "../../../database/auth/login";
import { Role } from "../../../database/role/role";
import { SignUpUserTypeInput } from "../../../types/user";
import { dataLoaders } from "../../resolvers/dataloaders";
import { generateToken } from "../../resolvers/query/auth/auth";
import {
  generateHash,
  trimObjectValues,
  validateFields,
} from "../../utility/commonMethod";

export const signUpUser = async (
  _: null,
  { input }: { input: SignUpUserTypeInput }
) => {
  const returnVal: any = {};

  const trimmedObj = trimObjectValues(input as any);
  const password = await generateHash(trimmedObj.password);
  // Check validation for each field
  const errors = validateFields(trimmedObj);

  if (errors) throw new Error(errors as any);
  const lowercaseEmail = trimmedObj.email.toLowerCase();

  const login = await Login.findOneBy({ email: lowercaseEmail});
  if (login) {
    throw new Error("Error: This email is already exists.");
  }
  // default role Id if you want to dyenimc pass from FE and add in where condition
  const roleId =
    (
      await Role.findOne({
        where: { roleConstraint: "USER" },
      })
    )?.id || "";

  // Insert new entity
  const response = await Login.createQueryBuilder()
    .insert()
    .values({ ...trimmedObj, email: lowercaseEmail, password, roleId })
    .output("*")
    .execute();
  if (!Array.isArray(response.raw) || response.raw.length === 0) {
    throw new Error("Failed to create user");
  }
  const createdUser = response.raw[0];

  const rootUser = await dataLoaders.userLoader
    .clear(createdUser.id)
    .load(createdUser.id);
  returnVal.token = await generateToken(rootUser);
  returnVal.info = rootUser;

  return returnVal;
};
