import type { NextApiRequest, NextApiResponse } from "next";

const url = `${process.env.GATEWAY_API}/api/parties`;

async function getRequest(req: NextApiRequest, res: NextApiResponse) {
  let response = await fetch(url);
  let json = await response.json();

  res.status(200).json(json);
}

async function postRequest(req: NextApiRequest, res: NextApiResponse) {
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: req.body,
  });

  if (response.status === 200) {
    let json = await response.json();
    res.status(200).json(json);
    return;
  }

  res.status(500).end();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await getRequest(req, res);
  } else if (req.method === "POST") {
    await postRequest(req, res);
  }
}
