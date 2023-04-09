import type { NextApiRequest, NextApiResponse } from "next";

import { Candidate } from "@/common/types/Candidate";
import auth0 from "@/common/utils/auth0";

const gatewayUrl = process.env.GATEWAY_API;

async function getElectionCandidates(accessToken: string, electionId: number) {
  const url = `${gatewayUrl}/api/elections/${electionId}/candidates`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      const json = await response.json();
      const candidates = json as Candidate[];

      return candidates;
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

  switch (req.method) {
    case "GET": {
      const { accessToken } = await auth0.getAccessToken(req, res, {
        scopes: ["read:elections"],
      });

      if (!accessToken) return res.status(500).end();

      const electionCandidates = await getElectionCandidates(
        accessToken,
        electionId
      );
      if (!electionCandidates) return res.status(500).end();

      return res.status(200).json(electionCandidates);
    }
  }
});

export { getElectionCandidates };
