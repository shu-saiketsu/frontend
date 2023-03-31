import type { ReactElement } from "react";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: ReactElement;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
