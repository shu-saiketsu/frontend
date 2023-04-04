import type { NextApiRequest, NextApiResponse } from "next";

import auth0 from "@/util/auth0";

const baseUrl = `${process.env.GATEWAY_API}/api/elections`;

async function getElections(req: NextApiRequest, res: NextApiResponse) {
  const { accessToken } = await auth0.getAccessToken(req, res, {
    scopes: ["read:elections"],
  });

  let response = await fetch(baseUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) return res.status(500).end();

  let json = await response.json();
  res.status(200).json(json);
}

async function createElection(req: NextApiRequest, res: NextApiResponse) {
  const { accessToken } = await auth0.getAccessToken(req, res, {
    scopes: ["create:elections"],
  });

  let response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: req.body,
  });

  if (response.status !== 200) return res.status(500).end();

  let json = await response.json();
  res.status(200).json(json);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await getElections(req, res);
  } else if (req.method === "POST") {
    await createElection(req, res);
  }
}
