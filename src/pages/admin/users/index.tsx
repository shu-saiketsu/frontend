import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import useUsers from "@/data/users/useUsers";
import { User } from "@/types/User";

function getTableData(users: User[]) {
  return (
    <tbody>
      {users?.map((user) => {
        return (
          <tr key={user.id}>
            <th>
              <Link href={`/admin/users/${user.id}`}>{user.id}</Link>
            </th>
            <th>{user.email}</th>
          </tr>
        );
      })}
    </tbody>
  );
}

function renderUsers(users: User[] | undefined) {
  if (users === undefined) return;

  return (
    <table>
      <thead>
        <tr>
          <th>Identifier</th>
          <th>Email</th>
        </tr>
      </thead>
      {getTableData(users)}
    </table>
  );
}

export default withPageAuthRequired(function Page() {
  const { users, error, isLoading } = useUsers();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Typography variant="h4">View Users</Typography>
      <Typography variant="subtitle2">Viewing all users</Typography>

      <Link href="/admin/users/create">create new user</Link>
      {renderUsers(users)}
    </>
  );
});
