import type { NextApiRequest, NextApiResponse } from "next";

import { RoleEnum } from "@/common/enums/RoleEnum";
import { User } from "@/common/types/User";
import auth0 from "@/common/utils/auth0";

const gatewayUrl = process.env.GATEWAY_API;

async function getUsers(accessToken: string) {
  const url = `${gatewayUrl}/api/users`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      const json = await response.json();
      const users = json as User[];

      return users;
    }
  } catch (error) {
    return null;
  }
}

async function createUser(
  accessToken: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  role?: RoleEnum
) {
  const url = `${gatewayUrl}/api/users`;

  try {
    const response = await fetch(url, {
      body: JSON.stringify({ email, password, firstName, lastName, role }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (response.status === 200) {
      const json = await response.json();
      const user = json as User;

      return user;
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
        scopes: ["read:users"],
      });

      if (!accessToken) return res.status(500).end();

      const users = await getUsers(accessToken);
      if (!users) return res.status(500).end();

      return res.status(200).json(users);
    }

    case "POST": {
      const { email, password, firstName, lastName, role } = JSON.parse(
        req.body
      );

      if (
        typeof email !== "string" ||
        typeof password !== "string" ||
        typeof firstName !== "string" ||
        typeof lastName !== "string"
      )
        return res.status(500).end();

      const { accessToken } = await auth0.getAccessToken(req, res, {
        scopes: ["create:users"],
      });

      if (!accessToken) return res.status(500).end();

      let roleEnum = undefined;
      if (role === "Administrator") {
        roleEnum = RoleEnum.Administrator;
      }

      const user = await createUser(
        accessToken,
        email,
        password,
        firstName,
        lastName,
        roleEnum
      );

      if (user) {
        return res.status(200).json(user);
      }

      return res.status(500).end();
    }
  }
});

export { getUsers };
