import type { NextApiRequest, NextApiResponse } from "next";

import { Health } from "@/common/types/Health";

const healthUrl = process.env.HEALTH_API;

async function getHealthStatus() {
  const url = `${healthUrl}/health`;

  try {
    const response = await fetch(url);

    if (response.status === 200 || response.status === 503) {
      const json = await response.json();
      const health = json as Health;

      return health;
    }
  } catch (error) {
    return null;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const health = await getHealthStatus();
  if (!health) return res.status(500).end();

  return res.status(200).json(health);
}

export { getHealthStatus };
