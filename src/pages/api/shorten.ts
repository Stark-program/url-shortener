import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const shorten = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.body;
  console.log(url);
};
