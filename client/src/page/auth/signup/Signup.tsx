import { Link, useNavigate } from "react-router-dom";
import classes from "./Signup.module.css";
import axios from "axios";
import { validateUserInput } from "../../../utils/validateUser";
import { BASE_URL } from "../../../utils/constants";
import toast from "react-hot-toast";
type Props = {};

function Signup({}: Props) {
  let navigate = useNavigate();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Collecting form data
    let data = new FormData(e.target as HTMLFormElement);
    let obj = {
      name: data.get("name")?.toString().trim(),
      email: data.get("email")?.toString().trim(),
      password: data.get("password")?.toString().trim(),
      confirmPassword: data.get("confirmPassword")?.toString().trim(),
      role: data.get("role")?.toString().trim(),
    };

    // Validate input
    let isValid = validateUserInput(obj);
    if (isValid.length!=0) {
      toast.error(isValid);
      return; // Don't proceed if validation fails
    }

    try {
      // API call to register the user
      let res = await axios.post(`${BASE_URL}/api/auth/register`, obj);

      // Handle successful registration
      if (res.status === 200) {
        toast.success("Registered successfully!");
        navigate("/"); // Navigate to home after success
      }
    } catch (err: any) {
      // Handle errors (like duplicate email or other server errors)
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message); // Display the error from server
      } else {
        toast.error("Something went wrong. Please try again."); // Generic error message
      }
      console.error("Error during signup: ", err); // Log the actual error for debugging
    }
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Create a new Account</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input name="name" type="name" required />
        </div>
        <div>
          <label>Email address</label>
          <input name="email" type="email" required />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" required />
        </div>
        <div>
          <label>Confirm Password</label>
          <input name="confirmPassword" type="password" required />
        </div>
        <div>
          <label>I am a </label>
          <select className={classes.select} name="role">
            <option value={"BRAND"}>Brand</option>
            <option value={"CREATOR"}>Creator</option>
          </select>
        </div>
        <div>
          <button className={classes.button} type="submit">
            Sign up
          </button>
        </div>
        <div>
          <Link to={"/"}>Already have an Account ? Sign in </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
