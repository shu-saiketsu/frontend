import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Typography from "@mui/material/Typography";
import Router from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

import { Party } from "@/types/Party";

type FormInputs = {
  name: string;
  description: string | null;
};

async function createParty(name: string, description: string | null) {
  let response = await fetch("/api/admin/parties", {
    method: "POST",
    body: JSON.stringify({ name, description }),
  });

  if (response.status === 200) {
    let json = await response.json();
    return json as Party;
  }

  return null;
}

export default withPageAuthRequired(function Page() {
  const { register, handleSubmit } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (!data.description) data.description = null;

    let party = await createParty(data.name, data.description);

    if (party !== null) {
      Router.push(`/admin/parties/${party.id}`);
    } else {
      alert("Could not create party.");
    }
  };

  return (
    <>
      <Typography variant="h4">Create Party</Typography>
      <Typography variant="subtitle2">Create a new party</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("name")} />
        <input type="text" {...register("description")} />

        <input type="submit" />
      </form>
    </>
  );
});
