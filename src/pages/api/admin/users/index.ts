import type { NextApiRequest, NextApiResponse } from "next";

const url = `${process.env.GATEWAY_API}/api/users`;

async function getRequest(req: NextApiRequest, res: NextApiResponse) {
  let response = await fetch(url);
  let json = await response.json();

  res.status(200).json(json);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await getRequest(req, res);
  } else if (req.method === "POST") {
  }
}
