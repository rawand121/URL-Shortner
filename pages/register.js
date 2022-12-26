import React from "react";
import Layout from "../components/Layout/layout";
import Navbar from "../components/Navbar/navbar";
import Register from "../components/register/Register";
import { getSession } from "next-auth/react";

const RegisterPage = () => {
  return (
    <Layout title="Register">
      <Navbar active={"register"} />
      <div className="container">
        <Register />
      </div>
    </Layout>
  );
};

export default RegisterPage;

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
