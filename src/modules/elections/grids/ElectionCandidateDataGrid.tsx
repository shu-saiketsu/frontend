import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Link from "next/link";
import * as React from "react";

async function deleteLink(electionId: number, candidateId: number) {
  const response = await fetch(
    `/api/elections/${electionId}/candidates/${candidateId}`,
    {
      method: "DELETE",
    }
  );

  return response.status === 200;
}

type ElectionCandidateDataGridProps = {
  rows: GridRowsProp;
  electionId: number;
  onCandidateDeleted: () => void;
};

export default function ElectionCandidateDataGrid({
  rows,
  electionId,
  onCandidateDeleted,
}: ElectionCandidateDataGridProps) {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Candidate Identifier",
      width: 200,
      sortable: false,
      flex: 0.5,
      renderCell: (cellValues) => {
        const identifier = cellValues.value;

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
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
      sortable: false,
    },
    {
      field: "delete",
      headerName: "Delete Link",
      sortable: false,
      width: 120,
      renderCell: (params) => {
        const candidateId = params.row["id"] as number;

        return (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteRequest(candidateId)}
            fullWidth
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const handleDeleteRequest = async (candidateId: number) => {
    const success = await deleteLink(electionId, candidateId);

    if (success) return onCandidateDeleted();
  };

  return (
    <Box sx={{ height: 1 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        disableColumnFilter
        disableColumnMenu
        disableRowSelectionOnClick
      />
    </Box>
  );
}
