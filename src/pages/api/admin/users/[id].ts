import type { NextApiRequest, NextApiResponse } from "next";

import auth0 from "@/util/auth0";

const baseUrl = `${process.env.GATEWAY_API}/api/users`;

async function getUser(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const url = `${baseUrl}/${id}`;

  const { accessToken } = await auth0.getAccessToken(req, res, {
    scopes: ["read:users"],
  });

  let response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) return res.status(500).end();

  let json = await response.json();
  res.status(200).json(json);
}

async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const url = `${baseUrl}/${id}`;

  const { accessToken } = await auth0.getAccessToken(req, res, {
    scopes: ["delete:users"],
  });

  let response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
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
    return await getUser(req, res);
  } else if (req.method === "DELETE") {
    return await deleteUser(req, res);
  }
}
