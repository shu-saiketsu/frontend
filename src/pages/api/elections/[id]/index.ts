import type { NextApiRequest, NextApiResponse } from "next";

import { Election } from "@/common/types/Election";
import auth0 from "@/common/utils/auth0";

const gatewayUrl = process.env.GATEWAY_API;

async function getElection(accessToken: string, id: number) {
  const url = `${gatewayUrl}/api/elections/${id}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      const json = await response.json();
      const election = json as Election;

      return election;
    }
  } catch (error) {
    return null;
  }
}

async function deleteElection(accessToken: string, id: number) {
  const url = `${gatewayUrl}/api/elections/${id}`;

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
  const id = Number(req.query.id);

  if (Number.isNaN(id)) return res.status(500).end();

  switch (req.method) {
    case "GET": {
      const { accessToken } = await auth0.getAccessToken(req, res, {
        scopes: ["read:elections"],
      });

      if (!accessToken) return res.status(500).end();

      const election = await getElection(accessToken, id);
      if (!election) return res.status(500).end();

      return res.status(200).json(election);
    }

    case "DELETE": {
      const { accessToken } = await auth0.getAccessToken(req, res, {
        scopes: ["delete:elections"],
      });

      if (!accessToken) return res.status(500).end();

      const deleteSuccess = await deleteElection(accessToken, id);

      return res.status(deleteSuccess ? 200 : 500).end();
    }
  }
});

export { getElection };
