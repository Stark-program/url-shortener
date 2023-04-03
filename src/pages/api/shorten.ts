import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const shorten = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.body;
  const { user } = req.body;
  const urlId = Math.random().toString(36).substring(2, 8);
  const shortUrl = `snippy.cc/${urlId}`;

  try {
    if (user) {
      await prisma.link.create({
        data: {
          url: url,
          linkId: urlId,
          shortUrl: shortUrl,
          user: user,
        },
      });
      return res.status(200).json({ shortUrl });
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
};

export default shorten;
