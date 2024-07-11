import { StatusCodes } from "http-status-codes";
import crypto from "crypto";

import UserModel from "../models/User.js";

import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/index.js";
import {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
} from "../utils/index.js";

const register = async (req, res) => {
  const { name, dob, email, password } = req.body;

  const verificationToken = crypto.randomBytes(40).toString("hex");
  const user = await UserModel.create({
    name,
    dob,
    email,
    password,
    verificationToken,
  });

  const origin = "http://localhost:5173";

  await sendVerificationEmail({ name, email, origin, verificationToken });

  res.status(StatusCodes.CREATED).json({
    msg: "Please check your email for verification ",
  });
};

const verifyEmail = async (req, res) => {
  const { email, verificationToken } = req.body;

  if (!email || !verificationToken) {
    throw new BadRequestError("Please provide email and token");
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  if (user.verificationToken !== verificationToken) {
    throw new UnauthenticatedError("Verfication token is incorrect");
  }
  user.verificationToken = "";
  user.isVerified = true;
  user.verified = new Date(Date.now());

  user.save();

  res
    .status(StatusCodes.OK)
    .json({ msg: "Verification of email is successfull" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please enter email and password");
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new BadRequestError(`No user with email ${email}`);
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Wrong email or password");
  }

  if (!user.isVerified) {
    throw new UnauthenticatedError("Please verify your email");
  }

  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, tokenUser });

  return res
    .status(StatusCodes.OK)
    .json({ msg: "Login Successfull", user: { name: user.name } });
};

//create new token

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "Logout user" });
};

export { register, verifyEmail, login, logout };
