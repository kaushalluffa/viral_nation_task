import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const rows = [
  { id: 1, email: "john@example.com", is_verified: true },
  { id: 2, email: "jane@example.com", is_verified: false },
  // ...more rows
];

export default function MyComponent() {
  const [sortModel, setSortModel] = useState([]);
  const [rowsSorted, setRowsSorted] = useState(rows);

  const handleSortModelChange = (model) => {
    setSortModel(model);
    const comparator = (a, b) => {
      // Compare rows based on the column and sort direction specified in the sort model
      for (const sort of model) {
        const column = sort.field;
        const direction = sort.sort;

        if (column === "is_verified") {
          const aVerified = a.is_verified ? 1 : 0;
          const bVerified = b.is_verified ? 1 : 0;
          const compare = aVerified - bVerified;
          if (compare !== 0) return direction === "asc" ? compare : -compare;
        } else {
          const compare = (a[column] || "").localeCompare(b[column] || "");
          if (compare !== 0) return direction === "asc" ? compare : -compare;
        }
      }
      return 0;
    };
    setRowsSorted([...rows].sort(comparator));
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rowsSorted}
        columns={[
          { field: "id", headerName: "ID", width: 90 },
          { field: "email", headerName: "Email", width: 200 },
          // ...other columns
        ]}
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
      />
    </div>
  );
};
