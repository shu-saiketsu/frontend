import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import useCandidates from "@/data/candidates/useCandidates";
import { Candidate } from "@/types/Candidate";
import { Party } from "@/types/Party";

function renderParty(party: Party | null) {
  if (party === null) return "N/A";

  return <Link href={`/admin/parties/${party.id}`}>{party.name}</Link>;
}

function getTableData(candidates: Candidate[]) {
  return (
    <tbody>
      {candidates?.map((candidate) => {
        return (
          <tr key={candidate.id}>
            <th>
              <Link href={`/admin/candidates/${candidate.id}`}>
                {candidate.id}
              </Link>
            </th>
            <th>{candidate.name}</th>
            <th>{renderParty(candidate.party)}</th>
          </tr>
        );
      })}
    </tbody>
  );
}

function renderCandidates(candidates: Candidate[] | undefined) {
  if (candidates === undefined) return;

  return (
    <table>
      <thead>
        <tr>
          <th>Identifier</th>
          <th>Name</th>
          <th>Party</th>
        </tr>
      </thead>
      {getTableData(candidates)}
    </table>
  );
}

export default withPageAuthRequired(function Page() {
  const { candidates, error, isLoading } = useCandidates();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Typography variant="h4">View candidates</Typography>
      <Typography variant="subtitle2">Viewing all candidates</Typography>

      <Link href="/admin/candidates/create">create new candidate</Link>
      {renderCandidates(candidates)}
    </>
  );
});
