import type { NextApiRequest, NextApiResponse } from "next";

import { Election } from "@/common/types/Election";
import auth0 from "@/common/utils/auth0";

const gatewayUrl = process.env.GATEWAY_API;

function convertToBoolean(input: string): boolean | undefined {
  try {
    return JSON.parse(input.toLowerCase());
  } catch (e) {
    return undefined;
  }
}

async function getUserElections(
  accessToken: string,
  userId: string,
  eligible: boolean
) {
  const url = `${gatewayUrl}/api/elections/users/${userId}?eligible=${eligible}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      const json = await response.json();
      const elections = json as Election[];

      return elections;
    }
  } catch (error) {
    return null;
  }
}

export default auth0.withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.userId as string;
  const eligible = convertToBoolean(req.query.eligible as string);

  if (eligible === undefined) return res.status(500).end();

  switch (req.method) {
    case "GET": {
      const { accessToken } = await auth0.getAccessToken(req, res);
      if (!accessToken) return res.status(500).end();

      const elections = await getUserElections(accessToken, userId, eligible);
      if (!elections) return res.status(500).end();

      return res.status(200).json(elections);
    }
  }
});

export { getUserElections };
