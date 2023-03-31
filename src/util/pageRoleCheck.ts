import { getSession } from "@auth0/nextjs-auth0";
import { isUserInRole } from "@/util/roleRetriver";
import { GetServerSidePropsContext } from "next";

const forbiddenError = { props: { accessError: "Forbidden" } };

export default async function pageRoleCheck(
  context: GetServerSidePropsContext,
  roleName: string
) {
  let session = await getSession(context.req, context.res);
  let user = session?.user;

  if (user === undefined) return forbiddenError;
  let roleResult = isUserInRole(user, roleName);

  if (!roleResult) return forbiddenError;

  return { props: {} };
}
