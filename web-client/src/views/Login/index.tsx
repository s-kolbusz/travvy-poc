import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex flex-col space-y-4 p-8">
      <Link to="/login/user" className="text-blue-500 hover:underline cursor-pointer">
        User login
      </Link>

      <Link to="/login/administration" className="text-blue-500 hover:underline cursor-pointer">
        Company login
      </Link>
    </div>
  )
}

export default Login;