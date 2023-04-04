import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Router, { useRouter } from "next/router";

import useElection from "@/data/elections/useElection";

function deleteElection(id: number) {
  fetch(`/api/admin/elections/${id}`, {
    method: "DELETE",
  })
    .then(function (result) {
      console.log(result);
      Router.push("/admin/elections/", undefined, { shallow: false });
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

  const { election, error, isLoading } = useElection(numericId);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Typography variant="h4">Election {id}</Typography>
      <Typography variant="subtitle2">
        Viewing information for election {id}
      </Typography>

      <p>id: {election?.id}</p>
      <p>name: {election?.name}</p>

      <Button onClick={() => deleteElection(numericId)}>Delete Election</Button>
    </>
  );
});
