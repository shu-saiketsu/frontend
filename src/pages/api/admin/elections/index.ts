import type { NextApiRequest, NextApiResponse } from "next";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { isUserInRole } from "@/util/roleRetriver";

const url = `${process.env.GATEWAY_API}/api/elections`;

async function getRequest(req: NextApiRequest, res: NextApiResponse) {
  let response = await fetch(url);
  let json = await response.json();

  res.status(200).json(json);
}

async function postRequest(req: NextApiRequest, res: NextApiResponse) {
  const { name, type }: { name: string; type: string } = req.body;

  const session = await getSession(req, res);
  const user = session?.user;

  console.log(JSON.stringify({ name, type, ownerId: user?.sub ?? "" }));

  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, type, ownerId: user?.sub ?? "" }),
  });

  if (response.status === 200) {
    let json = await response.json();
    res.status(200).json(json);
    return;
  }

  res.status(500).end();
}

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession(req, res);
  const user = session?.user;

  if (isUserInRole(user, "Administrator")) {
    if (req.method === "GET") {
      return await getRequest(req, res);
    } else if (req.method === "POST") {
      return await postRequest(req, res);
    }
  }

  res.status(401).end();
});
