import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { UserRound } from "lucide-react";
import axios from "axios";

import { notifyError, notifySuccess } from "../components/notify";

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
const Signup = () => {
  const schema = signUpSchema;
  type FormFields = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/register",
        data
      );

      notifySuccess(response.data.msg);
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const serverErrorMessage = error.response.data.msg || error.message;
          notifyError(serverErrorMessage);
        }
      } else {
        notifyError("Something went wrong");
      }
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
                Sign up
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

            <div className="mb-4">
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

            <div className="mb-4">
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

          <div className="flex items-center justify-between mt-6">
            <button
              className=" w-full bg-teal-500 capitalize hover:bg-teal-700 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:cursor-not-allowed "
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "submitting..." : "sign up"}
            </button>
          </div>

          <div className="text-stone-300 mt-3 text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="font-semibold">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
