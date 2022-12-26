import React from "react";
import axios from "axios";
import Layout from "../components/Layout/layout";
import Navbar from "../components/Navbar/navbar";
import LoginForm from "../components/LoginForm/loginForm";
import { getSession } from "next-auth/react";

const Login = () => {
  return (
    <Layout title="Login">
      <Navbar active={"login"} />
      <LoginForm />
    </Layout>
  );
};

export default Login;

export const getServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanentRedirect: false,
      },
    };
  }
  return {
    props: {
      language: "KU",
    },
  };
};
