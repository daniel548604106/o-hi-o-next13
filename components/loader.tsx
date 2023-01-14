import React from "react";

import classes from "./loader.module.css";

interface LoaderProps {
  type?: "default" | "spinner";
}

const Default = () => {
  return (
    <div className={classes.loading}>
      <div className={classes.binding}></div>
      <div className={classes.pad}>
        <div className={`${classes.line} ${classes.line1}`}></div>
        <div className={`${classes.line} ${classes.line2}`}></div>
        <div className={`${classes.line} ${classes.line3}`}></div>
      </div>
      <div className={classes.text}>O.HI.O is loading...</div>
    </div>
  );
};

const Spinner = () => {
  return <div className={classes.spinner} />;
};

const Loader = ({ type = "default" }: LoaderProps) => {
  switch (type) {
    case "default":
      return <Default />;
    case "spinner":
      return <Spinner />;
    default:
      return <Default />;
  }
};

export default Loader;
