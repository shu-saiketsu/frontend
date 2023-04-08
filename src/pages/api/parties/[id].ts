import type { NextApiRequest, NextApiResponse } from "next";
import auth0 from "@/common/utils/auth0";
import { Party } from "@/common/types/Party";

const gatewayUrl = process.env.GATEWAY_API;

async function getParty(accessToken: string, id: number) {
  const url = `${gatewayUrl}/api/parties/${id}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      const json = await response.json();
      const party = json as Party;

      return party;
    }
  } catch (error) {
    return null;
  }
}

async function deleteParty(accessToken: string, id: number) {
  const url = `${gatewayUrl}/api/parties/${id}`;

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);

  if (Number.isNaN(id)) return res.status(500).end();

  switch (req.method) {
    case "GET": {
      const { accessToken } = await auth0.getAccessToken(req, res, {
        scopes: ["read:parties"],
      });

      if (!accessToken) return res.status(500).end();

      const party = await getParty(accessToken, id);
      if (!party) return res.status(500).end();

      return res.status(200).json(party);
    }

    case "DELETE": {
      const { accessToken } = await auth0.getAccessToken(req, res, {
        scopes: ["delete:parties"],
      });

      if (!accessToken) return res.status(500).end();

      const deleteSuccess = await deleteParty(accessToken, id);

      return res.status(deleteSuccess ? 200 : 500).end();
    }
  }
}

export { getParty };
