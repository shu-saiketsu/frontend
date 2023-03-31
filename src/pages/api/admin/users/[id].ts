import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;

    const url = `${process.env.GATEWAY_API}/api/users/${id}`;

    let response = await fetch(url);
    let json = await response.json();

    res.status(200).json(json);
  } else if (req.method === "DELETE") {
    const { id } = req.query;

    const url = `${process.env.GATEWAY_API}/api/users/${id}`;

    let response = await fetch(url, { method: "DELETE" });
    let number = response.status === 200 ? 200 : 500;

    res.status(number).end();
  }
}
