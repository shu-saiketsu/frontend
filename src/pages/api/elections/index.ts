import type { NextApiRequest, NextApiResponse } from "next";

import { ElectionTypeEnum } from "@/common/enums/ElectionTypeEnum";
import { Election } from "@/common/types/Election";
import auth0 from "@/common/utils/auth0";

const gatewayUrl = process.env.GATEWAY_API;

async function getElections(accessToken: string) {
  const url = `${gatewayUrl}/api/elections`;

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

async function createElection(
  accessToken: string,
  name: string,
  type: number,
  startDate: string,
  endDate: string,
  ownerId: string
) {
  const url = `${gatewayUrl}/api/elections`;

  try {
    const response = await fetch(url, {
      body: JSON.stringify({ name, type, startDate, endDate, ownerId }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
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

export default auth0.withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      const { accessToken } = await auth0.getAccessToken(req, res, {
        scopes: ["read:elections"],
      });

      if (!accessToken) return res.status(500).end();

      const elections = await getElections(accessToken);
      if (!elections) return res.status(500).end();

      return res.status(200).json(elections);
    }

    case "POST": {
      const session = await auth0.getSession(req, res);

      const ownerId = session!.user.sub;
      const { name, type, startDate, endDate } = JSON.parse(req.body);

      const { accessToken } = await auth0.getAccessToken(req, res, {
        scopes: ["create:elections"],
      });

      if (!accessToken) return res.status(500).end();

      const typeEnum = Number(ElectionTypeEnum[type].valueOf());
      const election = await createElection(
        accessToken,
        name,
        typeEnum,
        startDate,
        endDate,
        ownerId
      );

      if (election) {
        return res.status(200).json(election);
      }

      return res.status(500).end();
    }
  }
});

export { getElections };
