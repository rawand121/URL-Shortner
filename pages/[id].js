import axios from "../axiosConfig";
import React from "react";

const Page = ({ Error }) => {
  return <div>{Error && <h1 className="text-center mt-5">{Error}</h1>}</div>;
};

export const getServerSideProps = async (ctx) => {
  let Error = "";
  try {
    const { data } = await axios(`/api/visitPage?id=${ctx.query.id}`);
    return {
      redirect: {
        destination: `${data}`,
        permanentRedirect: false,
      },
    };
  } catch (err) {
    Error = err.response.data;
  }
  return {
    props: {
      Error,
    },
  };
};

export default Page;
