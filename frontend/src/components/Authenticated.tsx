import { Navigate } from "react-router-dom";

function Authenticated({ children }: { children: React.ReactNode }) {
  const data = localStorage.getItem("user data");

  const user = data ? true : false;

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return <div> {children} </div>;
}

export default Authenticated;
