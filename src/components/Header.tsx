import { useUser } from "@auth0/nextjs-auth0/client";
import LoginButton from "./core/LoginButton";
import LogoutButton from "./core/LogoutButton";

export default function Header() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <p>header</p>
      {user ? <LogoutButton /> : <LoginButton />}
    </>
  );
}
