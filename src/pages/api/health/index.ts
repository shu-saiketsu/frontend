import type { NextApiRequest, NextApiResponse } from "next";

import { Health } from "@/common/types/Health";
import auth0 from "@/common/utils/auth0";

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

export default auth0.withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const health = await getHealthStatus();
  if (!health) return res.status(500).end();

  return res.status(200).json(health);
});

export { getHealthStatus };
