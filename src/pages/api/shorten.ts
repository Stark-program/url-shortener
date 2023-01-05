import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const shorten = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.body;
  const urlId = Math.random().toString(36).substring(2, 8);
  const shortUrl = `fwd.so/${urlId}`;

  try {
    const exist = await prisma.link.findUnique({
      where: {
        url: url,
      },
    });
    if (exist) {
      return res.status(200).json({ shortUrl: exist.shortUrl });
    } else {
      await prisma.link.create({
        data: {
          url: url,
          linkId: urlId,
          shortUrl: shortUrl,
        },
      });
      return res.status(200).json({ shortUrl });
    }
  } catch (error) {
    console.log(error);
  }
  console.log(shortUrl);
};

export default shorten;
