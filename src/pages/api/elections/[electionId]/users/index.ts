import type { NextApiRequest, NextApiResponse } from "next";

import { User } from "@/common/types/User";
import auth0 from "@/common/utils/auth0";

const gatewayUrl = process.env.GATEWAY_API;

async function getElectionUsers(accessToken: string, electionId: number) {
  const url = `${gatewayUrl}/api/elections/${electionId}/users`;

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
  const electionId = Number(req.query.electionId);

  if (Number.isNaN(electionId)) return res.status(500).end();

  const { accessToken } = await auth0.getAccessToken(req, res, {
    scopes: ["read:elections"],
  });

  if (!accessToken) return res.status(500).end();

  const electionUsers = await getElectionUsers(accessToken, electionId);
  if (!electionUsers) return res.status(500).end();

  return res.status(200).json(electionUsers);
});

export { getElectionUsers };
