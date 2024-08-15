import bcrypt from "bcrypt";
import { errorMessages, regex } from "./inputValidation";
import { OpenAI } from "openai";
import yenv from "yenv";
const env = yenv("env.yaml", { env: "development" });
// Function to generate a hash from a password using bcrypt
export async function generateHash(
  password: string,
  saltRounds = 10
): Promise<string> {
  const hash =  bcrypt.hash(password, saltRounds);

  return hash;
}

// Function to trim leading and trailing whitespace from all string values in an object
export function trimObjectValues(
  obj: Record<string, string>
): Record<string, string> {
  const trimmedObj: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    trimmedObj[key] = value.trim();
  }

  return trimmedObj;
}

function isValueEmpty(value: string): boolean {
    return value?.trim() === "";
}

function isValueExceedsMaxLength(value: string, maxLength: number): boolean {
    return value.length > maxLength;
}

function validateText(value: string, regex: RegExp): boolean {
    return regex.test(value);
}

function validateRequiredField(value: string): string | null {
    if (isValueEmpty(value)) {
        return errorMessages.required;
    }

    return null;
}

function validateMaxLength(value: string, maxLength: number): string | null {
    if (isValueExceedsMaxLength(value, maxLength)) {
        return errorMessages.maxCharacterlimit;
    }

    return null;
}

function validateTextPattern(value: string, pattern: RegExp, messageName: string): string | null {
    if (!validateText(value, pattern)) {
        return errorMessages[messageName];
    }

    return null;
}

interface ValidationRule {
    field: string;
    validators: ((value: string) => string | null)[];
}

const validationRules: ValidationRule[] = [
    {
        field: "fullName",
        validators: [
            validateRequiredField,
            (value) => validateMaxLength(value, 100),
            (value) => validateTextPattern(value, regex.text, "fullName"),
        ],
    },
    {
        field: "lastName",
        validators: [
            validateRequiredField,
            (value) => validateMaxLength(value, 100),
            (value) => validateTextPattern(value, regex.text, "lastName"),
        ],
    },
    {
        field: "email",
        validators: [
            validateRequiredField,
            (value) => validateMaxLength(value, 100),
            (value) => validateTextPattern(value, regex.email, "email"),
        ],
    },
    {
        field: "password",
        validators: [
            validateRequiredField,
            (value) => validateTextPattern(value, regex.password, "password"),
        ],
    },
    // Add more validation rules for other fields
];

// Function to validate an object based on the defined validation rules
export function validateFields(obj: Record<string, string>): string {
    for (const rule of validationRules) {
        const value = obj[rule.field];
        if (value !== undefined) {
            for (const validator of rule.validators) {
                const error = validator(value);
                if (error) {
                    return error;
                }
            }
        }
    }

    return "";
}

//  Function to generate a random string with specified length and character set constraints
export function generateRandomString(strLength: number = 8): string {
    const uppercaseLetters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseLetters: string = "abcdefghijklmnopqrstuvwxyz";
    const digits: string = "0123456789";
    const specialCharacters: string = "!@#$%^&*";
  
    const charset: string =
      uppercaseLetters + lowercaseLetters + digits + specialCharacters;
    const charsetLen: number = charset.length;
  
    // Ensure minimum length of 8 characters
    const length: number = Math.max(strLength, 8);
   
    let randomStr: string = "";
  
    // Add at least one uppercase letter
    randomStr += uppercaseLetters.charAt(
      Math.floor(Math.random() * uppercaseLetters.length)
    );
  
    // Add at least one lowercase letter
    randomStr += lowercaseLetters.charAt(
      Math.floor(Math.random() * lowercaseLetters.length)
    );
  
    // Add at least one digit
    randomStr += digits.charAt(Math.floor(Math.random() * digits.length));
  
    // Add at least one special character
    randomStr += specialCharacters.charAt(
      Math.floor(Math.random() * specialCharacters.length)
    );
  
    // Generate remaining characters randomly
    for (let i = randomStr.length; i < length; i++) {
      randomStr += charset.charAt(Math.floor(Math.random() * charsetLen));
    }
  
    return randomStr;
  }

  // Function to obfuscate a string by encoding it to base64 and removing "=" characters
  export function obfuscate(str: string): string {
    const obfuscatedString = Buffer.from(str).toString("base64");

    return obfuscatedString.replace(/=/g, "");
  }

  // Function to deobfuscate a string by adding "=" characters and decoding from base64
  export function deobfuscate(str: string): string {
    const paddedStr = str.padEnd(str.length + (4 - str.length % 4) % 4, "=");

    return Buffer.from(paddedStr, "base64").toString("utf8");
  }


//  Initialize OpenAI with the API key
  const openai = new OpenAI({
    apiKey:env.OPEN_AI_API_KEY,
  });

  export async function generateSummary(message: any) {
    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: `${message} Monitor the conversation between the patient and doctor. At the end, generate a summary based on the discussion.` }],
        model: "gpt-3.5-turbo",
      });
      // Extract the summary from the response
      const summary = chatCompletion.choices[0]?.message?.content || message;
      return summary;
    } catch (error) {
      return '';
    }
  }
  
  // For SOAP
  export async function generateSoap(message: any) {
    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: `${message} Generate a SOAP based on the summary.` }],
        model: "gpt-3.5-turbo",
      });
      // Extract the SOAP from the response
      const soap = chatCompletion.choices[0]?.message?.content || message;
      return soap;
    } catch (error) {
      return '';
    }
  }
  
