import * as React from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SideBarButton from "../SideBarButton";

export default function AccountButton() {
  return (
    <SideBarButton
      content="Account"
      href="/account"
      icon={<ManageAccountsIcon />}
    />
  );
}
