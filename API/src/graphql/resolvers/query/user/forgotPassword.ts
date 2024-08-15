import MailService from "../../../../config/mailService";
import { Login } from "../../../../database/auth/login";
import {
  deobfuscate,
  generateHash,
  generateRandomString,
  obfuscate,
} from "../../../utility/commonMethod";
import { changePasswordTemplate } from "../../../utility/templates/emailTemplate";
import yenv from "yenv";
const env = yenv("env.yaml", { env: "development" });

// Forgot Password
export const forgotPassword = async (_: any, { email }: { email: string }) => {
  const lowercaseLoginName = email.toLowerCase();
  const login = await Login.findOneBy({ email: lowercaseLoginName });

  if (!login) {
    throw new Error("Error: This email does not exist.");
  }

  if (!login.isActive) {
    throw new Error(`Your account has been suspended.`);
  }
  const randomString = generateRandomString(32);
  const token = await generateHash(randomString);
  await Login.createQueryBuilder("login")
    .update()
    .set({ resetToken: token })
    .where({ email })
    .output("*")
    .execute()
    .then((response) => {
      if (!Array.isArray(response.raw) || response.raw.length === 0) {
        throw new Error(`Failed to reset password.`);
      }
    });
  const basePath = env.CLIENT_URL;
  const encodedUrl = `${basePath}resetpassword/${obfuscate(token)}`;
  const mailService = MailService.getInstance();
  await mailService.sendMail(login.id, {
    to: email,
    from: env.SMTP_SENDER,
    subject: "[Media] Password Reset",
    html: changePasswordTemplate({
      email: login.email,
      link: encodedUrl,
    }),
  });

  return "A password reset email has been dispatched. Kindly review your email inbox";
};

// Change password
export const changePassword = async (
  _: any,
  { newPassword, resetToken }: { newPassword: string; resetToken: string }
) => {
  const decodeToken = deobfuscate(resetToken);
  const login = await Login.findOneBy({ resetToken: decodeToken });

  if (!login) {
    throw new Error(`Error: Your token has expired`);
  }
  const { email } = login;
  const hashedPassword = await generateHash(newPassword);

  await Login.createQueryBuilder("login")
    .update()
    .set({ password: hashedPassword })
    .where({ email })
    .output("*")
    .execute()
    .then((response) => {
      if (!Array.isArray(response.raw) || response.raw.length === 0) {
        throw new Error(`Failed to update password.`);
      }
    });

  return `Password has been changed successfully`;
};
