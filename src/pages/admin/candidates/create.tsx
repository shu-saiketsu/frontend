import type { GetServerSideProps } from "next";
import pageRoleCheck from "@/util/pageRoleCheck";

import { useForm, SubmitHandler } from "react-hook-form";
import type { Candidate } from "@/types/Candidate";
import Router from "next/router";

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

export default function Page() {
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
      <p>lets create candidate!!</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("name")} />
        <input type="number" {...register("partyId")} />

        <input type="submit" />
      </form>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await pageRoleCheck(context, "Administrator");
};
