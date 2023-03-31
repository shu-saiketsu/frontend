import type { GetServerSideProps } from "next";
import pageRoleCheck from "@/util/pageRoleCheck";
import type { Party } from "@/types/Party";
import useParties from "@/data/parties/useParties";
import Link from "next/link";

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

export default function Page() {
  const { parties, error, isLoading } = useParties();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <p>parties page</p>
      <Link href="/admin/parties/create">create new party</Link>
      {renderParties(parties)}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await pageRoleCheck(context, "Administrator");
};
