import type { GetServerSideProps } from "next";
import pageRoleCheck from "@/util/pageRoleCheck";
import { useForm, SubmitHandler } from "react-hook-form";
import Router from "next/router";
import { Election } from "@/types/Election";
import { ElectionTypeEnum } from "@/enums/ElectionTypeEnum";

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

export default function Page() {
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
      <p>lets create election!!</p>

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
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await pageRoleCheck(context, "Administrator");
};
