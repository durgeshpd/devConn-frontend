import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isSignupForm, setIsSignupForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [gender, setGender] = useState("");

  // Separate states for error and success messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(""); // Reset success message on submit

    try {
      let res;

      if (isSignupForm) {
        // Sign Up logic
        res = await axios.post(BASE_URL + "/signup", {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          emailId,
          password,
        });

        // If signup succeeds, display success message
        setSuccess("Signup successful! Please login.");
        setIsSignupForm(false); // Switch to login mode
      } else {
        // Login logic
        res = await axios.post(
          BASE_URL + "/login",
          { emailId, password },
          { withCredentials: true }
        );
        dispatch(addUser(res.data));
        navigate("/"); // Redirect to the homepage after login
      }
    } catch (err) {
      setError(err.response?.data || "An error occurred. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-2xl rounded-3xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-semibold mb-6">
            {isSignupForm ? "Sign Up" : "Login"}
          </h2>

          {/* Display error message */}
          {error && (
            <div className="text-red-500 mb-4">
              <strong>Error: </strong>{error}
            </div>
          )}

          {/* Display success message */}
          {success && (
            <div className="text-green-500 mb-4">
              <strong>Success: </strong>{success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignupForm && (
              <>
                <input
                  type="text"
                  value={firstName}
                  placeholder="First Name"
                  className="input input-bordered w-full rounded-lg"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  value={lastName}
                  placeholder="Last Name"
                  className="input input-bordered w-full rounded-lg"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input
                  type="text"
                  value={age}
                  placeholder="Age"
                  className="input input-bordered w-full rounded-lg"
                  onChange={(e) => setAge(e.target.value)}
                />
                
                {/* Gender Dropdown */}
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="input input-bordered w-full rounded-lg"
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                
                <input
                  type="text"
                  value={photoUrl}
                  placeholder="Photo URL"
                  className="input input-bordered w-full rounded-lg"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </>
            )}

            <input
              type="email"
              value={emailId}
              placeholder="Email"
              className="input input-bordered w-full rounded-lg"
              onChange={(e) => setEmailId(e.target.value)}
              required
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              className="input input-bordered w-full rounded-lg"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="btn btn-primary w-full rounded-lg">
              {isSignupForm ? "Sign Up" : "Login"}
            </button>

            <p
              className="text-center text-sm text-gray-500 cursor-pointer hover:underline mt-2"
              onClick={() => setIsSignupForm(!isSignupForm)}
            >
              {isSignupForm
                ? "Already have an account? Login"
                : "Don't have an account? Sign Up"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
