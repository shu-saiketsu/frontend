import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Router, { useRouter } from "next/router";

import useCandidate from "@/data/candidates/useCandidate";
import { Party } from "@/types/Party";

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

export default withPageAuthRequired(function Page() {
  const router = useRouter();
  const { id } = router.query;

  const numericId = Number(id);

  const { candidate, error, isLoading } = useCandidate(numericId);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Typography variant="h4">Candidate {id}</Typography>
      <Typography variant="subtitle2">
        Viewing information for candidate {id}
      </Typography>

      <p>id: {candidate?.id}</p>
      <p>name: {candidate?.name}</p>

      <Button onClick={() => deleteCandidate(numericId)}>
        Delete candidate
      </Button>

      {candidate?.party ? renderParty(candidate.party) : <p>no party</p>}
    </>
  );
});
