import { scopeString } from "@/common/utils/appScopes";
import auth0 from "@/common/utils/auth0";

const audience = process.env.AUTH0_AUDIENCE_IDENTIFIER;

export default auth0.handleAuth({
  login: auth0.handleLogin({
    authorizationParams: {
      audience,
      scope: scopeString,
    },
  }),
});
