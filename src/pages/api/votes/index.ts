import type { NextApiRequest, NextApiResponse } from "next";

import auth0 from "@/common/utils/auth0";

const gatewayUrl = process.env.GATEWAY_API;

async function castVote(
  accessToken: string,
  electionId: number,
  candidateId: number,
  userId: string
) {
  const url = `${gatewayUrl}/api/votes`;

  try {
    const response = await fetch(url, {
      body: JSON.stringify({ electionId, candidateId, userId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
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
  const session = await auth0.getSession(req, res);
  if (!session) return res.status(500).end();

  const { accessToken } = await auth0.getAccessToken(req, res);
  if (!accessToken) return res.status(500).end();

  const userId = session.user.sub;
  const { electionId, candidateId } = JSON.parse(req.body);

  const success = await castVote(accessToken, electionId, candidateId, userId);

  return res.status(success ? 200 : 500).end();
});
