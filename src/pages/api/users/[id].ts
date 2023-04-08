import type { NextApiRequest, NextApiResponse } from "next";

import { User } from "@/common/types/User";
import auth0 from "@/common/utils/auth0";

const gatewayUrl = process.env.GATEWAY_API;

async function getUser(accessToken: string, id: string) {
  const url = `${gatewayUrl}/api/users/${id}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      const json = await response.json();
      const user = json as User;

      return user;
    }
  } catch (error) {
    return null;
  }
}

async function deleteUser(accessToken: string, id: string) {
  const url = `${gatewayUrl}/api/users/${id}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "DELETE",
    });

    return response.status === 200;
  } catch (error) {
    return false;
  }
}

export default auth0.withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;

  if (typeof id !== "string") return res.status(500).end();

  switch (req.method) {
    case "GET": {
      const { accessToken } = await auth0.getAccessToken(req, res, {
        scopes: ["read:users"],
      });

      if (!accessToken) return res.status(500).end();

      const user = await getUser(accessToken, id);
      if (!user) return res.status(500).end();

      return res.status(200).json(user);
    }

    case "DELETE": {
      const { accessToken } = await auth0.getAccessToken(req, res, {
        scopes: ["delete:users"],
      });

      if (!accessToken) return res.status(500).end();

      const deleteSuccess = await deleteUser(accessToken, id);

      return res.status(deleteSuccess ? 200 : 500).end();
    }
  }
});

export { getUser };
