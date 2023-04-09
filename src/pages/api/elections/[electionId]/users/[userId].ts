import type { NextApiRequest, NextApiResponse } from "next";

import auth0 from "@/common/utils/auth0";

const gatewayUrl = process.env.GATEWAY_API;

async function deleteElectionUser(
  accessToken: string,
  electionId: number,
  userId: string
) {
  const url = `${gatewayUrl}/api/elections/${electionId}/users/${userId}`;

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

async function addElectionUser(
  accessToken: string,
  electionId: number,
  userId: string
) {
  const url = `${gatewayUrl}/api/elections/${electionId}/users/${userId}`;

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
  const userId = req.query.userId as string;

  if (Number.isNaN(electionId)) return res.status(500).end();

  switch (req.method) {
    case "POST": {
      const { accessToken } = await auth0.getAccessToken(req, res, {
        scopes: ["update:elections"],
      });

      if (!accessToken) return res.status(500).end();

      const deleteSuccess = await addElectionUser(
        accessToken,
        electionId,
        userId
      );

      return res.status(deleteSuccess ? 200 : 500).end();
    }

    case "DELETE": {
      const { accessToken } = await auth0.getAccessToken(req, res, {
        scopes: ["update:elections"],
      });

      if (!accessToken) return res.status(500).end();

      const deleteSuccess = await deleteElectionUser(
        accessToken,
        electionId,
        userId
      );

      return res.status(deleteSuccess ? 200 : 500).end();
    }
  }
});

export { deleteElectionUser as deleteElectionCandidate };
