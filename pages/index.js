import axios from "../axiosConfig";
import styles from "../styles/Home.module.css";
import LinkShortnerForm from "../components/Link/LinkShortner";
import Layout from "../components/Layout/layout";
import Navbar from "../components/Navbar/navbar";
import { useEffect, useState } from "react";

const Home = () => {
  const [Link, setLink] = useState();
  const [Error, setError] = useState();
  const [Success, setSuccess] = useState();

  const submitForm = async (url, slug) => {
    try {
      const res = await axios.post("/api/urls", { url, slug });
      if (res.data) {
        setLink(res.data);
        setError();
        setSuccess(true);
      } else {
        setError("کێشەی سێرڤەر هەیە، تکایە تۆزێکی تر هەوڵ بدەرەوە");
        setSuccess(false);
      }
    } catch (error) {
      setError(error.response.data);
      setSuccess(false);
    }
  };
  return (
    <Layout title="New Page">
      <Navbar active={"home"} />
      <div className={styles.container + " container"}>
        <LinkShortnerForm
          submitForm={submitForm}
          shortUrl={Link}
          Err={Error}
          success={Success}
        />
      </div>
    </Layout>
  );
};

export default Home;
