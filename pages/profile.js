import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/layout";
import ProfileComponent from "../components/ProfileComponent/Profile";
import TableOfUrls from "../components/ProfileComponent/TableOfUrls";
import Navbar from "../components/Navbar/navbar";
import { getSession } from "next-auth/react";
import Spinner from "../components/spinner/spinner";
import axios from "../axiosConfig";

const Profile = () => {
  const [User, setUser] = useState();
  const [Error, setError] = useState();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const { data } = await axios.get("/api/profile");
        setUser(data);
      };
      fetchData();
    } catch (Err) {
      setError(Err.response.data);
    }
  }, []);

  return (
    <>
      <Layout title="URL Shortner - Profile">
        <Navbar active={"profile"} />
        {Error ? (
          <h1>{Error}</h1>
        ) : User ? (
          <div className="container">
            <ProfileComponent user={User} />
            <TableOfUrls urls={User} />
          </div>
        ) : (
          <Spinner />
        )}
      </Layout>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanentRedirect: false,
      },
    };
  }
  return {
    props: {
      user: session.user,
    },
  };
};

Profile.auth = true;

export default Profile;
