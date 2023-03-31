import type { GetServerSideProps } from "next";
import pageRoleCheck from "@/util/pageRoleCheck";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Router from "next/router";
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

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  const numericId = Number(id);

  const { election, error, isLoading } = useElection(numericId);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <p>id: {election?.id}</p>
      <p>name: {election?.name}</p>

      <Button onClick={() => deleteElection(numericId)}>Delete Election</Button>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await pageRoleCheck(context, "Administrator");
};
