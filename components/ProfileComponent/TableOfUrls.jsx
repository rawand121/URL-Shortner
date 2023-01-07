import React, { useEffect, useState } from "react";
import Link from "next/link";
import DataTable from "react-data-table-component";

const TableOfUrls = (props) => {
  const [Columns, setColumns] = useState();

  useEffect(() => {
    setColumns(props.urls.links.sort().reverse());
  }, [props.urls]);

  const titles = [
    {
      name: "لینکی کورتکراوە",
      selector: (row) => row["shortUrl"],
      sortable: false,
      center: true,
      cell: (row) => (
        <Link href={`/${row["slug"]}`}>
          <h4>{row["shortUrl"]}</h4>
        </Link>
      ),
    },
    {
      name: "لینکی ئاسایی",
      selector: (row) => row["url"],
      sortable: false,
      center: true,
      cell: (row) => (
        <Link href={`${row["url"]}`}>
          <h4>{row["url"]}</h4>
        </Link>
      ),
    },
    {
      name: "بەروار",
      selector: (row) => row["createdAt"],
      sortable: true,
      center: true,
      cell: (row) => (
        <h4>
          {row["createdAt"].substr(0, 10).replace(",", "")} -{" "}
          {row["createdAt"].substr(10, 10)}
        </h4>
      ),
    },
  ];

  const Title = () => {
    return <h1 style={{ marginRight: "30px", fontSize: "3rem" }}>داتاکانت</h1>;
  };

  return (
    <>
      {Columns ? (
        <div className="mt-5">
          <DataTable
            title={<Title />}
            columns={titles}
            data={Columns}
            striped
            pagination
            paginationComponentOptions={"noRowsPerPage"}
          />
        </div>
      ) : null}
    </>
  );
};

export default TableOfUrls;
