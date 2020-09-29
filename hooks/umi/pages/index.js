import React from "react";
import styles from "./index.css";
import { Link } from "umi";

export default () => {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Link to="/users">go to /users</Link>
    </div>
  );
};
