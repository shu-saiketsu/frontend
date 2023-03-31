import { UserProfile } from "@auth0/nextjs-auth0/client";

// namespace/roles in access token
const namespace = process.env.NEXT_PUBLIC_AUTH0_NAMESPACE;
const roleNamespace = namespace + "/roles";

function getRolesFromUser(user: UserProfile | undefined) {
  if (user === undefined) {
    return [];
  }

  // unknown argument, force as string array
  const roles = user[roleNamespace] as String[];

  return roles;
}

function isUserInRole(user: UserProfile | undefined, roleName: String) {
  if (user === undefined) {
    return false;
  }

  // unknown argument, force as string array
  const roles = user[roleNamespace] as String[];

  // check to see the role name is in the namespace
  return roles.includes(roleName);
}

export { getRolesFromUser, isUserInRole };
