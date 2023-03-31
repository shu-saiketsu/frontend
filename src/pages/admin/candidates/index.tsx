import type { GetServerSideProps } from "next";
import pageRoleCheck from "@/util/pageRoleCheck";

import type { Candidate } from "@/types/Candidate";
import type { Party } from "@/types/Party";
import useCandidates from "@/data/candidates/useCandidates";
import Link from "next/link";

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

export default function Page() {
  const { candidates, error, isLoading } = useCandidates();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <p>candidates page</p>
      <Link href="/admin/candidates/create">create new candidate</Link>
      {renderCandidates(candidates)}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await pageRoleCheck(context, "Administrator");
};
