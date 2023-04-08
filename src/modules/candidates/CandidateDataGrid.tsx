import * as React from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Party } from "@/common/types/Party";
import Button from "@mui/material/Button";
import Link from "next/link";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Identifier",
    width: 200,
    sortable: false,
    renderCell: (cellValues) => {
      let identifier = cellValues.value;

      return (
        <Link
          href={`/admin/candidates/${identifier}`}
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
  { field: "name", headerName: "Name", width: 200, sortable: false },
  {
    field: "party",
    headerName: "Party",
    width: 200,
    flex: 1,
    sortable: false,
    valueGetter: (params) => params.row.party,
    renderCell: (cellValues) => {
      let party = cellValues.value as Party | null;

      if (party === null) return "N/A";

      return (
        <Link
          href={`/admin/parties/${party.id}`}
          style={{ textDecoration: "none", width: "100%" }}
          passHref
        >
          <Button
            variant="outlined"
            sx={{ justifyContent: "flex-start" }}
            fullWidth
          >
            <strong>{party.name}</strong>
          </Button>
        </Link>
      );
    },
  },
];

type CandidateDataTableProps = {
  rows: GridRowsProp;
};

export default function CandidateDataGrid({ rows }: CandidateDataTableProps) {
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
