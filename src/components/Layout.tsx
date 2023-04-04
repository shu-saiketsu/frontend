import Container from "@mui/material/Container";
import * as React from "react";

import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: React.ReactElement;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Container style={{ marginTop: "25px" }}>
        <main>{children}</main>
      </Container>

      <Footer />
    </>
  );
}
