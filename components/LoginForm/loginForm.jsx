import React, { useState } from "react";
import { signIn } from "next-auth/react";
import classes from "../register/register.module.css";
import { useRouter } from "next/router";

const LoginForm = () => {
  const [Error, setError] = useState();
  const [Success, setSuccess] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const router = useRouter();

  const sendReq = async (e) => {
    try {
      e.preventDefault();

      const res = await signIn("credentials", {
        redirect: false,
        email: email.toLowerCase(),
        password,
      });
      if (res.error) {
        setError(res.error);
      } else {
        setSuccess(true);
        setError(false);
        setTimeout(() => {
          router.replace("/");
        }, 2000);
      }
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <>
      <div className={"row mt-5 " + classes.registerForm}>
        <div
          className="col-sm-12  d-flex flex-column align-items-center justify-content-center"
          style={{ color: "black", textAlign: "start" }}
        >
          <div className="form login admin">
            <form autoComplete="off">
              <h4 className="m-0 mb-5 fw-bold" style={{ letterSpacing: "1px" }}>
                چونەژوورەوە
              </h4>

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

              {Success ? (
                <div className={classes.shortLinkSection}>
                  <div className={classes.boxContainer}>
                    <h3>چونە ژوورەوە سەرکەوتوو بوو.</h3>
                  </div>
                </div>
              ) : null}

              {Error ? (
                <div className={classes.shortLinkSectionErr}>
                  <div className={classes.boxContainerErr}>
                    <h3>
                      چونە ژوورەوە سەرکەوتوو نەبوو، تکایە جارێکی تر هەوڵ
                      بدەرەوە.
                    </h3>
                  </div>
                </div>
              ) : null}

              <button
                className="submitForm admin btn rounded-5 p-2"
                onClick={sendReq}
              >
                چونەژوورەوە
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
