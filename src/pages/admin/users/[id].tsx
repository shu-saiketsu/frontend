import type { GetServerSideProps } from "next";
import pageRoleCheck from "@/util/pageRoleCheck";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Router from "next/router";
import useUser from "@/data/users/useUser";

function deleteUser(id: string) {
  fetch(`/api/admin/users/${id}`, {
    method: "DELETE",
  })
    .then(function (result) {
      console.log(result);
      Router.push("/admin/users/", undefined, { shallow: false });
    })
    .catch(function (error) {
      alert("Check your internet connection");
      console.log(error);
    });
}

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  const identifier = String(id);

  const { user, error, isLoading } = useUser(identifier);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <p>id: {user?.id}</p>
      <p>email: {user?.email}</p>

      <Button onClick={() => deleteUser(identifier)}>Delete User</Button>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await pageRoleCheck(context, "Administrator");
};
