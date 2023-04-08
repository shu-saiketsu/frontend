import type { NextApiRequest, NextApiResponse } from "next";
import auth0 from "@/common/utils/auth0";
import { Candidate } from "@/common/types/Candidate";

const gatewayUrl = process.env.GATEWAY_API;

async function getCandidates(accessToken: string) {
  const url = `${gatewayUrl}/api/candidates`;

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

async function createCandidate(
  accessToken: string,
  name: string,
  partyId?: number
) {
  const url = `${gatewayUrl}/api/candidates`;

  try {
    const response = await fetch(url, {
      body: JSON.stringify({ name, partyId }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (response.status === 200) {
      const json = await response.json();
      const candidate = json as Candidate;

      return candidate;
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
        scopes: ["read:candidates"],
      });

      if (!accessToken) return res.status(500).end();

      const candidates = await getCandidates(accessToken);
      if (!candidates) return res.status(500).end();

      return res.status(200).json(candidates);
    }

    case "POST": {
      let { name, partyId } = JSON.parse(req.body);

      if (typeof name !== "string") return res.status(500).end();
      if (typeof partyId !== "number" && partyId !== undefined)
        return res.status(500).end();

      const { accessToken } = await auth0.getAccessToken(req, res, {
        scopes: ["create:candidates"],
      });

      if (!accessToken) return res.status(500).end();

      const candidate = await createCandidate(accessToken, name, partyId);

      if (candidate) {
        return res.status(200).json(candidate);
      }

      return res.status(500).end();
    }
  }
}

export { getCandidates };
