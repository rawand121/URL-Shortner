import React, { useEffect, useState } from "react";
import classes from "./formShortner.module.css";
import UndrawImage from "../../public/undraw.svg";
import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const LinkShortner = (props) => {
  const [Url, setUrl] = useState();
  const [Slug, setSlug] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState();

  useEffect(() => {
    const isUserLoggedIn = async () => {
      setUserLoggedIn(await getSession());
    };

    isUserLoggedIn();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    props.submitForm(Url, Slug);
  };
  return (
    <div className={"mt-5 " + classes.form}>
      <h1 className={classes.header}>كورتکردنەوەی لینک</h1>
      <div className="row">
        <div className="col-sm-8">
          <form
            onSubmit={submitHandler}
            action=""
            className={classes.form + "row "}
          >
            <div className={"col-sm-12 " + classes.formInput}>
              <div className="inputField">
                <label htmlFor="Url">لینک</label>
                <input
                  type="text"
                  className="form-control"
                  id="Url"
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </div>
            <div className={"col-sm-12 " + classes.formInput}>
              <div className="inputField">
                <label htmlFor="ID">ناسنامە</label>
                <input
                  type="text"
                  className="form-control"
                  id="ID"
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
            </div>
            <div className={"col-sm-12 " + classes.formInput}>
              <div className="inputField">
                <button
                  className={"btn mt-5 " + classes.btn}
                  data-bs-toggle={!userLoggedIn && "modal"}
                  data-bs-target={!userLoggedIn && "#staticBackdrop"}
                >
                  ناردن
                </button>
              </div>
            </div>
          </form>
          <>
            {(props.shortUrl && props.success) ? (
              <div className={classes.shortLinkSection}>
                <h2 className="my-5">سەرکەوتوو بوو</h2>
                <div className={classes.boxContainer}>
                  <Link href={props.shortUrl ? props.shortUrl : ""}>
                    <h3>لینکی کورتکراوە : {props.shortUrl}</h3>
                  </Link>
                </div>
              </div>
            ) : null}

            {props.Err ? (
              <div className={classes.shortLinkSectionErr}>
                <h2 className="my-5">سەرکەوتوو نەبوو</h2>
                <div className={classes.boxContainerErr}>
                  <h3>کێشەیەک هەیە : {props.Err}</h3>
                </div>
              </div>
            ) : null}
          </>
        </div>
        <div className="col-sm-4">
          <Image
            alt="HELLO"
            src={UndrawImage}
            layout={"responsive"}
            objectFit={"cover"}
          />
        </div>
      </div>

      {!userLoggedIn && (
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
          style={{ direction: "rtl" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className={"modal-title text-danger " + classes.modalTitle}
                  id="exampleModalLabel"
                >
                  داواکاری..!
                </h1>
                <button
                  type="button"
                  className="btn-close  ms-0"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className={"modal-body " + classes.modalBody}>
                تکایە هەژمار دروست بکە هەتا بتوانین لینکەکانی ڕابردوت بۆ
                هەڵبگرین و بە ئاسانی بەدەستی بهێنیتەوە.
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  داخستنەوە
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkShortner;
