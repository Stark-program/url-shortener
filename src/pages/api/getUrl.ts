// import type { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const getUrl = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { urlId } = req.query;

//   try {
//     const link = await prisma.link.findUnique({
//       where: {
//         linkId: urlId,
//       },
//     });
//     if (link) {
//       res.status(200).json({ url: link.url });
//     } else {
//       res.status(404).send({ error: "No link found" });
//     }
//   } catch (error) {
//     res.status(500).send({ error: "Failed to fetch data" });
//     console.log(error);
//   }
// };

// export default getUrl;
