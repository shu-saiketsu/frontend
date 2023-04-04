import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import useElections from "@/data/elections/useElections";
import { Election } from "@/types/Election";

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

export default withPageAuthRequired(function Page() {
  const { elections, error, isLoading } = useElections();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Typography variant="h4">View Elections</Typography>
      <Typography variant="subtitle2">Viewing all elections</Typography>

      <Link href="/admin/elections/create">create new election</Link>
      {renderElections(elections)}
    </>
  );
});
