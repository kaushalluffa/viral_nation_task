import { DataGrid } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import VerifiedFilter from "./VerifiedFilter";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "emailVerified",
    headerName: "Email Verified",
    width: 150,
    filterRenderer: VerifiedFilter,
  },
];

const rows = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    emailVerified: false,
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    emailVerified: true,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    emailVerified: false,
  },
];

const CustomVerifiedFilterDataGrid = () => {
  const [filterModel, setFilterModel] = useState({items:[]});

  const handleFilterChange = (model) => {
    setFilterModel(model);
  };

  const filteredRows =useMemo(() => {
    const verifiedValue = filterModel.emailVerified;
    if (verifiedValue === "verified") {
      return rows.filter((row) => row.emailVerified === true);
    } else if (verifiedValue === "unverified") {
      return rows.filter((row) => row.emailVerified === false);
    } else {
      return rows;
    }
  }, [filterModel]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        filterModel={filterModel}
        onFilterModelChange={handleFilterChange}
      />
    </div>
  );
};

export default CustomVerifiedFilterDataGrid;
