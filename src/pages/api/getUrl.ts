import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import Cors from "cors";

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});
const prisma = new PrismaClient();

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const getUrl = async (req: NextApiRequest, res: NextApiResponse) => {
  const { urlId } = req.query;

  await runMiddleware(req, res, cors);

  try {
    const link = await prisma.link.findUnique({
      where: {
        linkId: urlId,
      },
    });
    if (link) {
      res.status(200).json({ url: link.url });
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch data" });
    console.log(error);
  }
};

export default getUrl;
