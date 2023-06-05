import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { prisma } from "@/db";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    //req has body obj sent by client for sign up.
    const { firstName, lastName, email, phone, city, password } = req.body;
    const errors: string[] = [];

    //use validator package that returns boolean for checking
    // then make Array of Object
    const validationSchema = [
      {
        valid: validator.isLength(firstName, {
          min: 1,
          max: 15,
        }),
        errorMessage: "First name is invalid",
      },
      {
        valid: validator.isLength(lastName, {
          min: 1,
          max: 15,
        }),
        errorMessage: "First name is invalid",
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is invalid",
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: "Phone number is invalid",
      },
      {
        valid: validator.isLength(city, { min: 1 }),
        errorMessage: "City is invalid",
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: "Password is not strong enough",
      },
    ];

    //Now check error for each field and push it into error array.
    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    //Show the first error if erros exists
    if (errors.length) {
      return res.status(400).json({ errorMessage: errors[0] });
    }

    //Check if User already exists with this email.
    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    //user already exist error
    if (userWithEmail) {
      return res
        .status(400)
        .json({ errorMessage: "Email is associated with another account" });
    }

    //Hash password and then create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        password: hashedPassword,
        city,
        phone,
        email,
      },
    });

    const alg = "HS256";

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    /*
    JWT PROCESS.
    */
    //1.we create json web token from user's email that is unique
    const token = await new jose.SignJWT({ email: user.email })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);

    //2.store the jwt token created from email in cookies
    setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 });

    //Finally return json response
    return res.status(200).json({
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone,
      city: user.city,
    });
  }

  return res.status(404).json("Unknown endpoint or method denied.");
}
