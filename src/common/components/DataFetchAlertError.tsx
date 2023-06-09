import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import * as React from "react";

export default function DataFetchAlertError() {
  return (
    <Alert severity="error">
      <AlertTitle>Unable to fetch data</AlertTitle>
      <strong>Sorry!</strong> 🥲 Please try again later.
    </Alert>
  );
}
