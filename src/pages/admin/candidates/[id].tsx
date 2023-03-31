import type { GetServerSideProps } from "next";
import pageRoleCheck from "@/util/pageRoleCheck";

import useCandidate from "@/data/candidates/useCandidate";
import { Party } from "@/types/Party";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Router from "next/router";

function renderParty(party: Party) {
  return (
    <>
      <p>party id: {party.id}</p>
      <p>party name: {party.name}</p>
    </>
  );
}

function deleteCandidate(id: number) {
  fetch(`/api/admin/candidates/${id}`, {
    method: "DELETE",
  })
    .then(function (result) {
      Router.push("/admin/candidates/", undefined, { shallow: false });
    })
    .catch(function (error) {
      alert("Check your internet connection");
      console.log(error);
    });
}

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  const numericId = Number(id);

  const { candidate, error, isLoading } = useCandidate(numericId);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <p>id: {candidate?.id}</p>
      <p>name: {candidate?.name}</p>

      <Button onClick={() => deleteCandidate(numericId)}>
        Delete candidate
      </Button>

      {candidate?.party ? renderParty(candidate.party) : <p>no party</p>}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await pageRoleCheck(context, "Administrator");
};
