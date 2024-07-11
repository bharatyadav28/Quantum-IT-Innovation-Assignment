import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { UserRound } from "lucide-react";
import axios from "axios";

const signUpSchema = z.object({
  email: z.string().email({ message: "Email is not valid" }),
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  dob: z
    .string({ required_error: "Date is required" })
    .transform((str) => new Date(str))
    .refine((date) => !isNaN(date.getTime()), {
      message: "Please enter a valid date",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// const signInSchema = z.object({
//   email: z.string().email({ message: "Email is not valid" }),

//   password: z
//     .string()
//     .min(6, { message: "Password must be at least 6 characters" }),
// });

interface PropsTypes {
  isRegister?: boolean;
}

const AuthForm: React.FC<PropsTypes> = ({ isRegister }) => {
  // const schema = isRegister ? signUpSchema : signInSchema;
  const schema = signUpSchema;

  type FormFields = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/register",
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-500">
      <div className="relative w-full max-w-xs ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col bg-slate-900 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <div className="absolute top-[-1rem] left-1/2 transform -translate-x-1/2 ">
              <h2 className=" bg-teal-400 py-3 px-8 uppercase text-center text-2xl font-medium mb-6 text-gray-700">
                {isRegister ? "Sign up" : "Sign in"}
              </h2>
            </div>

            <div className=" flex justify-center mt-[2.5rem]">
              <span className="  border-4 border-stone-400 rounded-full p-1 w-[5rem] ">
                <UserRound className="w-full h-full overflow-hidden  fill-stone-500" />
              </span>
            </div>
          </div>

          <div className="flex flex-col ">
            <div className="mb-4">
              <input
                {...register("email")}
                className=" input-style  "
                id="username"
                type="text"
                placeholder="Email"
              />
              {errors.email && (
                <p role="alert" className="input-error">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className={`${!isRegister ? "hidden" : "block mb-4"}`}>
              <input
                {...register("name")}
                className="input-style  "
                placeholder="Name"
                type="name"
              />
              {errors.name && (
                <p role="alert" className="input-error">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className={`${!isRegister ? "hidden" : "block mb-4"}`}>
              <input
                {...register("dob")}
                className="input-style  "
                placeholder="Date of birth"
                type="date"
              />
              {errors.dob && (
                <p role="alert" className="input-error">
                  {errors.dob.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <input
                {...register("password")}
                className="input-style "
                id="password"
                type="password"
                placeholder="Password"
              />
              {errors.password && (
                <p role="alert" className="input-error">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-0 text-sm">
            <p className="text-xs text-gray-600 flex items-center">
              <input className="mr-2 leading-tight" type="checkbox" />
              <span> Remember me</span>
            </p>
            <a
              className="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              className=" w-full bg-teal-500 capitalize hover:bg-teal-700 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isRegister ? "sign up" : "login"}
            </button>
          </div>

          <div className="text-stone-300 mt-3 text-center">
            {!isRegister && (
              <p>
                Don't Have An Account? <Link to="/signup">Sign Up</Link>
              </p>
            )}
            {isRegister && (
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
