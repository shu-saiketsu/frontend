import type { NextApiRequest, NextApiResponse } from "next";
import auth0 from "@/common/utils/auth0";
import { Party } from "@/common/types/Party";

const gatewayUrl = process.env.GATEWAY_API;

async function getParties(accessToken: string) {
  const url = `${gatewayUrl}/api/parties`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      const json = await response.json();
      const parties = json as Party[];

      return parties;
    }
  } catch (error) {
    return null;
  }
}

async function createParty(
  accessToken: string,
  name: string,
  description: string
) {
  const url = `${gatewayUrl}/api/parties`;

  try {
    const response = await fetch(url, {
      body: JSON.stringify({ name, description }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      const { accessToken } = await auth0.getAccessToken(req, res, {
        scopes: ["read:parties"],
      });

      if (!accessToken) return res.status(500).end();

      const parties = await getParties(accessToken);
      if (!parties) return res.status(500).end();

      return res.status(200).json(parties);
    }

    case "POST": {
      let { name, description } = JSON.parse(req.body);

      if (typeof name !== "string" || typeof description !== "string")
        return res.status(500).end();

      const { accessToken } = await auth0.getAccessToken(req, res, {
        scopes: ["create:parties"],
      });

      if (!accessToken) return res.status(500).end();

      const party = await createParty(accessToken, name, description);

      if (party) {
        return res.status(200).json(party);
      }

      return res.status(500).end();
    }
  }
}

export { getParties };
