import axios from "../axiosConfig";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Page = () => {
  const [Error, setError] = useState();
  const router = useRouter();
  useEffect(() => {
    const moveToRealPage = async () => {
      try {
        if (router.query.id) {
          const res = await axios.get(`/api/visitPage?id=${router.query.id}`);
          window.location = res.data;
        }
      } catch (err) {
        setError(err.response.data);
      }
    };

    moveToRealPage();
  }, [router.query.id]);

  return <div>{Error && <h1>{Error}</h1>}</div>;
};

export default Page;
