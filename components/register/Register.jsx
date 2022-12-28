import React, { useState } from "react";
import axios from "../../axiosConfig";
import classes from "./register.module.css";
import { useRouter } from "next/router";

const Register = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [Error, setError] = useState();
  const [email, setEmail] = useState();
  const router = useRouter();

  const sendReq = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", {
        username: userName,
        email,
        password: password,
      });

      if (!res.error) {
        router.push("/login");
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className={"row mt-5 " + classes.registerForm}>
      {!Error ? (
        <div
          className="col-sm-12  d-flex flex-column align-items-center justify-content-center"
          style={{ color: "black", textAlign: "start" }}
        >
          <div className="form login admin">
            <form autoComplete="off">
              <h4 className="m-0 fw-bold" style={{ letterSpacing: "1px" }}>
                تۆمارکردن
              </h4>
              <span className="signinNote my-4 d-block">
                ناوی بەکارهێنەر و وشەی نهێنی بنووسە
              </span>

              <div className="input_field">
                <label className="fw-bold" htmlFor="email">
                  ناوی بەکارهێنەر
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="ناوی بەکارهێنەر بنووسە"
                  name="userName"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="input_field">
                <label className="fw-bold" htmlFor="email">
                  ئیمەیڵ
                </label>
                <input
                  className="form-control"
                  type="email"
                  required
                  placeholder="ئیمەیڵ"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input_field">
                <label className="fw-bold" htmlFor="pass">
                  وشەی نهێنی
                </label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="وشەی نهێنی"
                  name="userPassword"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="p-3">
                <span className="text-danger small">
                  تکایە هیچ داتایەکی هەستیار و نهێنی لێرە دا مەنێن چونکە کاتمان
                  تەرخان نەکردووە بۆ ئاسایشی سیستمەکە D:
                </span>
              </div>
              <button
                className="submitForm admin btn rounded-5 p-2"
                onClick={sendReq}
              >
                دروستکردن
              </button>
            </form>
          </div>
        </div>
      ) : (
        <h1 className="text-center">{Error}</h1>
      )}
    </div>
  );
};

export default Register;
