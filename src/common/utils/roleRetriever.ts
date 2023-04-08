import { UserProfile } from "@auth0/nextjs-auth0/client";

const namespace = process.env.NEXT_PUBLIC_AUTH0_NAMESPACE;
const roleNamespace = namespace + "/roles";

function getUserRoles(user?: UserProfile) {
  if (user === undefined) return [];

  const roles = user[roleNamespace] as string[];

  if (!roles) return false;

  return roles;
}

function isUserInRole(roleName: string, user?: UserProfile) {
  if (user === undefined) return false;

  const roles = user[roleNamespace] as string[];

  if (!roles) return false;

  return roles.includes(roleName);
}

export { getUserRoles, isUserInRole };
