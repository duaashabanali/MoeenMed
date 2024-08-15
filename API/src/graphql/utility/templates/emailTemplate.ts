import { ChangePasswordTemplateOptions } from "../../../types/mutationResponse";

export function changePasswordTemplate(opts: ChangePasswordTemplateOptions) {
  const { email, link } = opts;

  return `
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
  <html lang="en">

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Password Reset</title>
  </head>

  <body style="margin: 0; padding: 0; background-color: #f7f7f7;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 10px;">
      <h2 style="text-align: center; color: #0277B6;">Password Reset</h2>
      <p>Hello,${email}</p>
      <p>Someone has requested a link to reset your password. You can do this by clicking the button below:</p>
      <div style="text-align: center;">
        <a href="${link}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #0277B6; border-radius: 5px; text-decoration: none;">Reset Password</a>
      </div>
      <p>If you did not request this, please ignore this email. Your password will not change until you access the link above and create a new one.</p>
      <p>Thank you!</p>
      <p style="text-align: center; color: #808285;">&copy; 2024 Multi Trans | All rights reserved.</p>
    </div>
  </body>

  </html>
  `;
}
