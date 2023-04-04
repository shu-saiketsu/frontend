import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Typography from "@mui/material/Typography";
import Router from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

import { Candidate } from "@/types/Candidate";

type FormInputs = {
  name: string;
  partyId: number | null;
};

async function createCandidate(name: string, partyId: number | null) {
  let response = await fetch("/api/admin/candidates", {
    method: "POST",
    body: JSON.stringify({ name, partyId }),
  });

  if (response.status === 200) {
    let json = await response.json();
    return json as Candidate;
  }

  return null;
}

export default withPageAuthRequired(function Page() {
  const { register, handleSubmit } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (!data.partyId) data.partyId = null;

    let candidate = await createCandidate(data.name, data.partyId);

    if (candidate !== null) {
      Router.push(`/admin/candidates/${candidate.id}`);
    } else {
      alert("Could not create candidate.");
    }
  };

  return (
    <>
      <Typography variant="h4">Create Candidate</Typography>
      <Typography variant="subtitle2">Create a new candidate</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("name")} />
        <input type="number" {...register("partyId")} />

        <input type="submit" />
      </form>
    </>
  );
});
