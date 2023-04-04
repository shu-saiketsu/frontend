import { GetServerSidePropsContext } from "next";

import { isUserInRole } from "@/util/roleRetriver";

import auth0 from "./auth0";

const forbiddenError = { props: { accessError: "Forbidden" } };

export default async function pageRoleCheck(
  context: GetServerSidePropsContext,
  roleName: string
) {
  let session = await auth0.getSession(context.req, context.res);
  let user = session?.user;

  if (user === undefined) return forbiddenError;
  let roleResult = isUserInRole(user, roleName);

  if (!roleResult) return forbiddenError;

  return { props: {} };
}
