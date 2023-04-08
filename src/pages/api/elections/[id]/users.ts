import type { NextApiRequest, NextApiResponse } from "next";

import { User } from "@/common/types/User";
import auth0 from "@/common/utils/auth0";

const gatewayUrl = process.env.GATEWAY_API;

async function getElectionUsers(accessToken: string, id: number) {
  const url = `${gatewayUrl}/api/elections/${id}/users`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      const json = await response.json();
      const users = json as User[];

      return users;
    }
  } catch (error) {
    return null;
  }
}

export default auth0.withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);

  if (Number.isNaN(id)) return res.status(500).end();

  switch (req.method) {
    case "GET": {
      const { accessToken } = await auth0.getAccessToken(req, res, {
        scopes: ["read:elections"],
      });

      if (!accessToken) return res.status(500).end();

      const electionUsers = await getElectionUsers(accessToken, id);
      if (!electionUsers) return res.status(500).end();

      return res.status(200).json(electionUsers);
    }
  }
});

export { getElectionUsers };
