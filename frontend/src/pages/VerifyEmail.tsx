import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { Button } from "../components/ui/button";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  // retreive data from url
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  useEffect(() => {
    const url = `http://localhost:4000/api/v1/auth/verify-email?email:${email}&token:${token}`;
    const connectDb = async () => {
      const response = await axios.post(url, {
        email,
        verificationToken: token,
      });

      setData(response.data.msg);
    };
    try {
      connectDb();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        setError(axiosError?.message);
      } else {
        setError("Something went wrong");
      }
      console.log(error);
    }
  }, []);

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center mt-[10rem] text-2xl font-bold">
      {" "}
      {data && (
        <div className=" flex flex-col">
          <p>{data}</p>
          <div className="mx-auto mt-5">
            <Button
              onClick={handleClick}
              className="bg-blue-500 transition-all"
            >
              Please Login
            </Button>
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default VerifyEmail;
