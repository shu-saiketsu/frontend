import Button from "@mui/material/Button";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Link from "next/link";
import * as React from "react";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Identifier",
    width: 200,
    sortable: false,
    renderCell: (cellValues) => {
      const identifier = cellValues.value;

      return (
        <Link
          href={`/admin/parties/${identifier}`}
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
    field: "description",
    headerName: "Description",
    width: 200,
    sortable: false,
    flex: 1,
  },
];

type PartyDataTableProps = {
  rows: GridRowsProp;
};

export default function PartyDataGrid({ rows }: PartyDataTableProps) {
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
