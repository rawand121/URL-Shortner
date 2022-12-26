import React, { useEffect, useState } from "react";
import Link from "next/link";
import DataTable from "react-data-table-component";

const TableOfUrls = (props) => {
  const [Columns, setColumns] = useState();
  useEffect(() => {
    setColumns(props.urls.links);
  }, [props.urls]);

  const titles = [
    {
      name: "لینکی کورتکراوە",
      selector: "shortUrl",
      sortable: false,
      center: true,
      cell: (row) => {
        return (
          <Link href={`${row.url}`}>
            <h4>{row.shortUrl}</h4>
          </Link>
        );
      },
    },
    {
      name: "لینکی ئاسایی",
      selector: "url",
      sortable: false,
      center: true,

      cell: (row) => {
        return (
          <Link href={`${row.url}`}>
            <h4>{row.url}</h4>
          </Link>
        );
      },
    },
    {
      name: "بەروار",
      selector: "createdAt",
      sortable: true,
      center: true,
      cell: (row) => {
        return <h4>{row.createdAt.substr(0, 10)}</h4>;
      },
    },
  ];

  return (
    <>
      {Columns ? (
        <div className="mt-5">
          <DataTable
            title={() => {
              return <h2 style={{ marginRight: "30px" }}>داتاکانت</h2>;
            }}
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
