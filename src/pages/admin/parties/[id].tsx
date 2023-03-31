import type { GetServerSideProps } from "next";
import pageRoleCheck from "@/util/pageRoleCheck";
import useParty from "@/data/parties/useParty";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Router from "next/router";

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

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  const numericId = Number(id);

  const { party, error, isLoading } = useParty(numericId);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <p>id: {party?.id}</p>
      <p>name: {party?.name}</p>

      <Button onClick={() => deleteParty(numericId)}>Delete Party</Button>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await pageRoleCheck(context, "Administrator");
};
