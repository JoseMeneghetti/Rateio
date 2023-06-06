// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "process";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const prisma = new PrismaClient();

  const body = { ...req.body };

  try {
    const response = await axios.post(
      `${env.NEXT_PUBLIC_DOMAIN_URL}/api/password`,
      {
        id: body.id,
        password: body.password,
      }
    );

    if (response.data.code === 403) {
      return res.status(response.status).json(response.data);
    } else {
      await prisma.rateio.update({
        where: { id: body.id },
        data: {
          rateio: body.rateio,
        },
      });

      return res.status(200).json({ message: "Sucesso", code: 200 });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(`${error} - Houve um problema com o banco de dados`);
  }
}
