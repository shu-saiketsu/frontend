import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Router, { useRouter } from "next/router";

import useParty from "@/data/parties/useParty";

function deleteParty(id: number) {
  fetch(`/api/admin/parties/${id}`, {
    method: "DELETE",
  })
    .then(function (result) {
      console.log(result);
      Router.push("/admin/parties/", undefined, { shallow: false });
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

  const { party, error, isLoading } = useParty(numericId);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Typography variant="h4">Party {id}</Typography>
      <Typography variant="subtitle2">
        Viewing information for party {id}
      </Typography>

      <p>id: {party?.id}</p>
      <p>name: {party?.name}</p>

      <Button onClick={() => deleteParty(numericId)}>Delete Party</Button>
    </>
  );
});
