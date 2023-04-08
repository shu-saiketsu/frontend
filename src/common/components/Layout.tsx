import * as React from "react";
import Stack from "@mui/material/Stack";
import Sidebar from "./SideBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Header from "./Header/Header";
import { UserProfile } from "@auth0/nextjs-auth0/client";

type LayoutProps = {
  user?: UserProfile;
  children: React.ReactElement;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Stack direction="row">
      <Box sx={{ width: 300 }}>
        <Sidebar />
      </Box>

      <Box sx={{ width: 1 }}>
        <Header />
        <Container maxWidth="xl">
          <Box mb={2}>
            <main>{children}</main>
          </Box>
        </Container>
      </Box>
    </Stack>
  );
}
