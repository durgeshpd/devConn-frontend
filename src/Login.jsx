import { useState } from "react";

const Login = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        
    }

    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="card w-96 bg-base-100 shadow-2xl rounded-3xl">
          <div className="card-body">
            <h2 className="text-center text-2xl font-semibold mb-6">Login</h2>
  
            {/* Login Form */}
            <form className="space-y-4">
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
              <button className="btn btn-primary w-full rounded-lg">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;
  