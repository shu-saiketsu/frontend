import type { GetServerSideProps } from "next";
import pageRoleCheck from "@/util/pageRoleCheck";
import Link from "next/link";
import { Election } from "@/types/Election";
import useElections from "@/data/elections/useElections";

function getTableData(elections: Election[]) {
  return (
    <tbody>
      {elections?.map((election) => {
        return (
          <tr key={election.id}>
            <th>
              <Link href={`/admin/elections/${election.id}`}>
                {election.id}
              </Link>
            </th>
            <th>{election.name}</th>
            <th>{election.type.name}</th>
            <th>{election.ownerId}</th>
          </tr>
        );
      })}
    </tbody>
  );
}

function renderElections(elections: Election[] | undefined) {
  if (elections === undefined) return;

  return (
    <table>
      <thead>
        <tr>
          <th>Identifier</th>
          <th>Name</th>
          <th>Type</th>
          <th>Owner</th>
        </tr>
      </thead>
      {getTableData(elections)}
    </table>
  );
}

export default function Page() {
  const { elections, error, isLoading } = useElections();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <p>election page</p>
      <Link href="/admin/elections/create">create new election</Link>
      {renderElections(elections)}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await pageRoleCheck(context, "Administrator");
};
