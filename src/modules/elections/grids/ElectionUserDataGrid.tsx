import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Link from "next/link";
import * as React from "react";

async function deleteLink(electionId: number, userId: string) {
  const response = await fetch(`/api/elections/${electionId}/users/${userId}`, {
    method: "DELETE",
  });

  return response.status === 200;
}

type ElectionUserDataGridProps = {
  electionId: number;
  rows: GridRowsProp;
  onUserDeleted: () => void;
};

export default function ElectionUserDataGrid({
  rows,
  electionId,
  onUserDeleted,
}: ElectionUserDataGridProps) {
  const handleDeleteRequest = async (userId: string) => {
    const success = await deleteLink(electionId, userId);

    if (success) return onUserDeleted();
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "User Identifier",
      flex: 1,
      sortable: false,
      renderCell: (cellValues) => {
        const identifier = cellValues.value;

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
      field: "delete",
      headerName: "Delete Link",
      sortable: false,
      width: 120,
      renderCell: (params) => {
        const userId = params.row["id"] as string;

        return (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteRequest(userId)}
            fullWidth
          >
            Delete
          </Button>
        );
      },
    },
  ];

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
