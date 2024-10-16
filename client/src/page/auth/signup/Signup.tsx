import { Link } from 'react-router-dom';
import classes from './Signup.module.css'
type Props = {};

function Signup({}: Props) {
  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Create a new Account</h1>
      <form className={classes.form}>
        <div>
          <label>Name</label>
          <input name="text" type="name" required />
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
          <input name="password" type="password"  required />
        </div>
        <div>
          <label>I am a </label>
          <select className={classes.select} name="type">
            <option value={"brand"}>Brand</option>
            <option value={"creator"}>Creator</option>
          </select>
        </div>
        <div>
          <button className={classes.button} type="submit">Sign up</button>
        </div>
        <div>
          <Link to={"/"}>Already have an Account ? Sign in </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
