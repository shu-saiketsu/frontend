const scopeArray = [
  "openid",
  "profile",
  "email",
  "offline_access",

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
  "sanction:users",
];

function generateScopeString(scopes: string[]) {
  let scopeString = "";
  scopes.forEach((scope) => {
    scopeString += scope + " ";
  });

  return scopeString;
}

const scopeString = generateScopeString(scopeArray);

export { scopeArray, scopeString };
