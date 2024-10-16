import classes from "./Login.module.css";
import { Link } from "react-router-dom";

type Props = {};

function Login({}: Props) {
  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Sign in to your account</h1>
      <form className={classes.form}>
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
          <select className={classes.select} name="type">
            <option value={"brand"}>Brand</option>
            <option value={"creator"}>Creator</option>
          </select>
        </div>
        <div>
          <button className={classes.button} type="submit">Sign in</button>
        </div>
        <div>
          <Link to={"/signup"}>Need an Account ? Register </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
