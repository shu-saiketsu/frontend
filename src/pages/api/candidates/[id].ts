import type { NextApiRequest, NextApiResponse } from "next";
import auth0 from "@/common/utils/auth0";
import { Candidate } from "@/common/types/Candidate";

const gatewayUrl = process.env.GATEWAY_API;

async function getCandidate(accessToken: string, id: number) {
  const url = `${gatewayUrl}/api/candidates/${id}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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

async function deleteCandidate(accessToken: string, id: number) {
  const url = `${gatewayUrl}/api/candidates/${id}`;

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
        scopes: ["read:candidates"],
      });

      if (!accessToken) return res.status(500).end();

      const candidate = await getCandidate(accessToken, id);
      if (!candidate) return res.status(500).end();

      return res.status(200).json(candidate);
    }

    case "DELETE": {
      const { accessToken } = await auth0.getAccessToken(req, res, {
        scopes: ["delete:candidates"],
      });

      if (!accessToken) return res.status(500).end();

      const deleteSuccess = await deleteCandidate(accessToken, id);

      return res.status(deleteSuccess ? 200 : 500).end();
    }
  }
}

export { getCandidate };
