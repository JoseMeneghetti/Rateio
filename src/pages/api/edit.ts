// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const prisma = new PrismaClient();

  const body = { ...req.body };

  try {
    const productResult = await prisma.rateio.update({
      where: { id: body.id },
      data: {
        rateio: body.rateio,
      },
    });

    res.status(200).json("Sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).json(`${error} - Houve um problema com o banco de dados`);
  }
}
