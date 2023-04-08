import Button from "@mui/material/Button";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Link from "next/link";
import * as React from "react";

import { ElectionTypeEnum } from "@/common/enums/ElectionTypeEnum";

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
          href={`/admin/elections/${identifier}`}
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
    field: "typeId",
    headerName: "Type",
    width: 200,
    sortable: false,
    renderCell: (cellValues) => {
      const identifier = cellValues.value as ElectionTypeEnum;

      switch (identifier) {
        case ElectionTypeEnum.FirstPassThePost: {
          return "(FPTP) First Past The Post";
        }

        default: {
          return "(UNK) Unknown Type";
        }
      }
    },
  },
  { field: "name", headerName: "Name", width: 200, sortable: false },
  {
    field: "ownerId",
    headerName: "Owner Identifier",
    sortable: false,
    flex: 1,
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
            <strong>View User</strong>
          </Button>
        </Link>
      );
    },
  },
];

type ElectionDataGridProps = {
  rows: GridRowsProp;
};

export default function ElectionDataGrid({ rows }: ElectionDataGridProps) {
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
