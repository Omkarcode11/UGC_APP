import toast from "react-hot-toast";
import { loginUserValidation } from "../../../utils/validateUser";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";

type Props = {};

function Login({}: Props) {
  let navigate = useNavigate();
  async function loginHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      let data = new FormData(e.target as HTMLFormElement);
      let obj = {
        email: data.get("email")?.toString().trim(),
        password: data.get("password")?.toString().trim(),
        role: data.get("role")?.toString().trim(),
      };
      let isValid = loginUserValidation(obj);

      if (isValid) {
        toast.error(isValid);
        return;
      }

      let res = await axios.post(BASE_URL + "/api/auth/login", obj);

      if (res.status == 200) {
        let { token, message } = res.data;
        localStorage.setItem("token", token);
        toast.success(message);
        navigate(`/dashboard/${obj.role?.toLocaleLowerCase()}`);
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
      <h1 className={classes.header}>Sign in to your account</h1>
      <form className={classes.form} onSubmit={loginHandler}>
        <div>
          <label>Email address</label>
          <input name="email" type="email" required />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" required />
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
            Sign in
          </button>
        </div>
        <div>
          <Link to={"/signup"}>Need an Account ? Register </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
