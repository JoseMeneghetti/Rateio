import { PrismaClient, Rateio } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { encodeBase64 } from "../../lib/utils/base64";
import pako from "pako";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id, password } = req.body;

  try {
    const pakoDeflatedPass = pako.deflate(password);

    const pakoEncoded64Pass = encodeBase64(pakoDeflatedPass);

    const productResult = await prisma.rateio.findFirst({
      where: {
        id: id,
        password: pakoEncoded64Pass,
      },
    });

    if (productResult) {
      res.status(200).json({ message: "Sucesso" });
    } else {
      res.status(200).json({ message: "Senha invalida", code: 403 });
    }
  } catch (error) {
    res.status(500).json(`${error} - Houve um problema com o banco de dados`);
  }
}
