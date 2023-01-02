import React from "react";
import classes from "./Profile.module.css";

const ProfileComponent = ({ user }) => {
  return (
    <>
      <div className={classes.bordered}>
        <div className="row">
          <div className="col-sm-6 col-md-3 text-center">
            <h1>ناوی تەواو</h1>
            <span className={classes.data}>{user.username}</span>
          </div>
          <div className="col-sm-6 col-md-3 text-center">
            <h1>ئیمەیڵ</h1>
            <span className={classes.data}>{user.email}</span>
          </div>
          <div className="col-sm-6 col-md-3 text-center">
            <h1>لینکەکان</h1>
            <span className={classes.data}>{user.links.length}</span>
          </div>
          <div className="col-sm-6 col-md-3 text-center">
            <h1>دروستکردن</h1>
            <span className={classes.data} style={{ direction: "ltr" }}>
              {user.createdAt
                .substr(0, 10)
                .replace(",", "")
                .replaceAll("/", "-")}
              / {user.createdAt.substr(10, 10)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileComponent;
