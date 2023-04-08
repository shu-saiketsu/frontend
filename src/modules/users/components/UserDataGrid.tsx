import * as React from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Identifier",
    width: 350,
    sortable: false,
    renderCell: (cellValues) => {
      let identifier = cellValues.value;

      return (
        <Link
          href={`/admin/users/${identifier}`}
          style={{ textDecoration: "none", width: "100%" }}
          passHref
        >
          <Button
            variant="outlined"
            sx={{ justifyContent: "flex-start" }}
            fullWidth
          >
            <strong>{identifier}</strong>
          </Button>
        </Link>
      );
    },
  },
  {
    field: "email",
    headerName: "Email Address",
    sortable: false,
    width: 300,
    flex: 1,
  },
];

type UserDataTableProps = {
  rows: GridRowsProp;
};

export default function UserDataGrid({ rows }: UserDataTableProps) {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSizeOptions={[5]}
      initialState={{
        pagination: { paginationModel: { pageSize: 5 } },
      }}
      autoHeight
      disableColumnFilter
      disableColumnMenu
      disableRowSelectionOnClick
    />
  );
}
