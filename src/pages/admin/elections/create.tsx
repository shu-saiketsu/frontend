import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Typography from "@mui/material/Typography";
import Router from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

import { ElectionTypeEnum } from "@/enums/ElectionTypeEnum";
import { Election } from "@/types/Election";

type FormInputs = {
  name: string;
  selection: string;
};

async function createElection(name: string, type: string) {
  let response = await fetch("/api/admin/elections", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({ name, type }),
  });

  if (response.status === 200) {
    let json = await response.json();
    return json as Election;
  }

  return null;
}

export default withPageAuthRequired(function Page() {
  const { register, handleSubmit } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    let election = await createElection(data.name, data.selection);

    console.log("sent data: " + data.selection);

    if (election !== null) {
      Router.push(`/admin/elections/${election.id}`);
    } else {
      alert("Could not create election.");
    }
  };

  return (
    <>
      <Typography variant="h4">Create Election</Typography>
      <Typography variant="subtitle2">Create a new election</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("name")} />
        <select defaultValue="" {...register("selection")}>
          <option value="" disabled>
            Select Option
          </option>
          <option value={ElectionTypeEnum.FirstPassThePost}>
            First pass the post
          </option>
          <option value={ElectionTypeEnum.Other}>Other</option>
        </select>

        <input type="submit" />
      </form>
    </>
  );
});
