import type { NextApiRequest, NextApiResponse } from "next";

import auth0 from "@/common/utils/auth0";

const gatewayUrl = process.env.GATEWAY_API;

async function deleteElectionCandidate(
  accessToken: string,
  electionId: number,
  candidateId: number
) {
  const url = `${gatewayUrl}/api/elections/${electionId}/candidates/${candidateId}`;

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

async function addElectionCandidate(
  accessToken: string,
  electionId: number,
  candidateId: number
) {
  const url = `${gatewayUrl}/api/elections/${electionId}/candidates/${candidateId}`;

  try {
    const response = await fetch(url, {
      headers: {
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
  const electionId = Number(req.query.electionId);
  const candidateId = Number(req.query.candidateId);

  if (Number.isNaN(electionId) || Number.isNaN(candidateId))
    return res.status(500).end();

  switch (req.method) {
    case "POST": {
      const { accessToken } = await auth0.getAccessToken(req, res, {
        scopes: ["update:elections"],
      });

      if (!accessToken) return res.status(500).end();

      const deleteSuccess = await addElectionCandidate(
        accessToken,
        electionId,
        candidateId
      );

      return res.status(deleteSuccess ? 200 : 500).end();
    }

    case "DELETE": {
      const { accessToken } = await auth0.getAccessToken(req, res, {
        scopes: ["update:elections"],
      });

      if (!accessToken) return res.status(500).end();

      const deleteSuccess = await deleteElectionCandidate(
        accessToken,
        electionId,
        candidateId
      );

      return res.status(deleteSuccess ? 200 : 500).end();
    }
  }
});

export { deleteElectionCandidate };
