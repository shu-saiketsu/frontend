import { isUserInRole } from "@/util/roleRetriver";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

function renderAdministrator() {
  return (
    <>
      <Link href="/admin/elections">Elections</Link>
      <br />
      <Link href="/admin/candidates">Candidates</Link>
      <br />
      <Link href="/admin/parties">Parties</Link>
      <br />
      <Link href="/admin/users">Users</Link>
    </>
  );
}

function renderUser() {
  return <Link href="/public/vote">Vote</Link>;
}

function renderNotLoggedIn() {
  return (
    <>
      <p>ur not logged in</p>
    </>
  );
}

export default function Page() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const isAdministrator = isUserInRole(user, "Administrator");

  return (
    <>
      <p>index</p>
      <p>Administrator: {String(isAdministrator)}</p>

      {user
        ? isAdministrator
          ? renderAdministrator()
          : renderUser()
        : renderNotLoggedIn()}
    </>
  );
}
