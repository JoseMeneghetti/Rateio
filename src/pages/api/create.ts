// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import pako from "pako";
import { encodeBase64 } from "../../lib/utils/base64";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const prisma = new PrismaClient();

  const body = { ...req.body };

  try {
    const pakoDeflatedPass = pako.deflate(body.password);

    const pakoEncoded64Pass = encodeBase64(pakoDeflatedPass);

    const productResult = await prisma.rateio.create({
      data: {
        rateio: body.rateio,
        password: pakoEncoded64Pass,
      },
    });

    res.status(200).json({ message: "Sucesso", productResult });
  } catch (error) {
    console.error(error);
    res.status(500).json(`${error} - Houve um problema com o banco de dados`);
  }
}
