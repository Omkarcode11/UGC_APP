// ErrorPage.tsx
import React from "react";
import { useRouteError, Link } from "react-router-dom";
import classes from "./ErrorPage.module.css";

const ErrorPage: React.FC = () => {
  const error: any = useRouteError();

  return (
    <div className={classes.errorContainer}>
      <h1 className={classes.title}>Oops! Something went wrong</h1>
      <p className={classes.message}>
        {error?.message || "An unexpected error occurred."}
      </p>

      <div className={classes.actions}>
        <Link to="/" className={classes.button}>
          Go to Login
        </Link>
        <Link to="/signup" className={classes.button}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
