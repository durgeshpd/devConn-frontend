import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

  const [emailId, setEmailId] = useState("virat@kholi.com");
  const [password, setPassword] = useState("Virat@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    
    e.preventDefault(); // prevents page reload
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password,
      },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-2xl rounded-3xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-semibold mb-6">Login</h2>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={emailId}
              placeholder="Email"
              className="input input-bordered w-full rounded-lg"
              onChange={(e) => setEmailId(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              className="input input-bordered w-full rounded-lg"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn btn-primary w-full rounded-lg">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
