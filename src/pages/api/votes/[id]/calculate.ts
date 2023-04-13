import type { NextApiRequest, NextApiResponse } from "next";

import auth0 from "@/common/utils/auth0";

const gatewayUrl = process.env.GATEWAY_API;

async function calculateVote(accessToken: string, electionId: number) {
  const url = `${gatewayUrl}/api/votes/${electionId}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      const json = await response.json();
      const dictionary = json as { [key: number]: number };

      return dictionary;
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

  if (Number.isNaN(id))
    return {
      redirect: {
        destination: "/",
      },
    };

  const { accessToken } = await auth0.getAccessToken(req, res);
  if (!accessToken) return res.status(500).end();

  const data = await calculateVote(accessToken, id);

  if (!data) return res.status(500).end();

  return res.status(200).json(data);
});
