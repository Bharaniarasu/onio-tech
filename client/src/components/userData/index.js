import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

import { columns } from "./data";
import axios from "axios";
import { useEffect, useState } from "react";
// import { data } from "./data";
const UserData = () => {
  const [data, setData] = useState([]);
  const tableData = {
    columns,
    data,
  };
  console.log(data);
  useEffect(() => {
    axios
      .get("http://localhost:3001")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <DataTableExtensions {...tableData}>
        <DataTable
          columns={columns}
          data={data}
          noHeader
          defaultSortField="Name"
          defaultSortAsc={false}
          pagination
          highlightOnHover
        />
      </DataTableExtensions>
    </div>
  );
};

export default UserData;
