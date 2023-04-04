import auth0 from "@/util/auth0";

const gateway = process.env.AUTH0_GATEWAY_IDENTIFIER;

const scopes = [
  "openid",
  "profile",
  "email",
  "read:candidates",
  "create:candidates",
  "delete:candidates",
  "read:elections",
  "create:elections",
  "update:elections",
  "delete:elections",
  "read:parties",
  "create:parties",
  "delete:parties",
  "read:users",
  "create:users",
  "delete:users",
];

// converts an array of strings to a spaced string
function generateScopeString(scopes: string[]) {
  let scopeString = "";
  scopes.forEach((scope) => {
    scopeString += scope + " ";
  });

  return scopeString;
}

export default auth0.handleAuth({
  login: auth0.handleLogin({
    authorizationParams: {
      audience: gateway,
      scope: generateScopeString(scopes),
    },
  }),
});
