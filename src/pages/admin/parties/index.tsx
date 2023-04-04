import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import useParties from "@/data/parties/useParties";
import { Party } from "@/types/Party";

function getTableData(parties: Party[]) {
  return (
    <tbody>
      {parties?.map((party) => {
        return (
          <tr key={party.id}>
            <th>
              <Link href={`/admin/parties/${party.id}`}>{party.id}</Link>
            </th>
            <th>{party.name}</th>
          </tr>
        );
      })}
    </tbody>
  );
}

function renderParties(parties: Party[] | undefined) {
  if (parties === undefined) return;

  return (
    <table>
      <thead>
        <tr>
          <th>Identifier</th>
          <th>Name</th>
        </tr>
      </thead>
      {getTableData(parties)}
    </table>
  );
}

export default withPageAuthRequired(function Page() {
  const { parties, error, isLoading } = useParties();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Typography variant="h4">View Parties</Typography>
      <Typography variant="subtitle2">Viewing all parties</Typography>

      <Link href="/admin/parties/create">create new party</Link>
      {renderParties(parties)}
    </>
  );
});
