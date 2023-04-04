import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Typography from "@mui/material/Typography";
import Router from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

import { User } from "@/types/User";

type FormInputs = {
  email: string;
  password: string;
};

async function createUser(email: string, password: string) {
  let response = await fetch("/api/admin/users", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (response.status === 200) {
    let json = await response.json();
    return json as User;
  }

  return null;
}

export default withPageAuthRequired(function Page() {
  const { register, handleSubmit } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    let party = await createUser(data.email, data.password);

    if (party !== null) {
      Router.push(`/admin/users/${party.id}`);
    } else {
      alert("Could not create user.");
    }
  };

  return (
    <>
      <Typography variant="h4">Create User</Typography>
      <Typography variant="subtitle2">Create a new user</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("email")} />
        <input type="text" {...register("password")} />

        <input type="submit" />
      </form>
    </>
  );
});
