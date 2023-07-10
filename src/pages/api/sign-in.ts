import { prisma } from "@/lib/prisma/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { password, email } = req.body;

  const companyData = await prisma.company.findFirst({ where: { email } });

  if (!companyData) {
    res.json(null);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, companyData.salt);
  const isPasswordCorrect = companyData.password === hashedPassword;

  if (!isPasswordCorrect) {
    res.json(null);
    return;
  }

  const { companyId, companyName, email: savedEmail } = companyData;
  return res
    .status(200)
    .json({ id: companyId, name: companyName, email: savedEmail });
}
