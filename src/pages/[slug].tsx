import type { GetServerSideProps } from "next";
import { prisma } from "../server/db/client";
import type { ParsedUrlQuery } from "querystring";

const UrlPage = () => {
  return;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug }: ParsedUrlQuery = context.query;

  const isArray = Array.isArray(slug);

  if (isArray) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  } else {
    try {
      const url = await prisma.link.findFirst({
        where: {
          linkId: slug,
        },
      });
      if (url !== null) {
        return {
          redirect: {
            destination: url?.url,
            permanent: false,
          },
        };
      } else {
        return {
          redirect: {
            destination: "/404",
            permanent: false,
          },
        };
      }
    } catch (err) {
      console.log(err);
      return {
        redirect: {
          destination: "/500",
          permanent: false,
        },
      };
    }
  }
};

export default UrlPage;
