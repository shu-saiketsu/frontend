import type { GetServerSideProps } from "next";
import pageRoleCheck from "@/util/pageRoleCheck";
import type { Party } from "@/types/Party";
import useParties from "@/data/parties/useParties";
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

export default function Page() {
  const { users, error, isLoading } = useUsers();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <p>users page</p>
      <Link href="/admin/users/create">create new user</Link>
      {renderUsers(users)}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await pageRoleCheck(context, "Administrator");
};
