import * as React from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Link from "next/link";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "User Identifier",
    width: 200,
    sortable: false,
    flex: 1,
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
];

type ElectionUserDataGridProps = {
  rows: GridRowsProp;
};

export default function ElectionUserDataGrid({
  rows,
}: ElectionUserDataGridProps) {
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
