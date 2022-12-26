import Head from "next/head";

const Layout = (props) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>

      {props.children}
    </>
  );
};

export default Layout;
