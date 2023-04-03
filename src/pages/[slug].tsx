import axios from "axios";
import NotFound from "../components/NotFound";
import type { GetServerSideProps } from "next";

const UrlPage = () => {
  return;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;

  try {
    const res = await axios.get(`http://localhost:3000/api/getUrl`, {
      params: {
        urlId: slug,
      },
    });
    const url = res.data.url;
    if (res.status === 200) {
      return {
        redirect: {
          destination: url,
          permanent: false,
        },
      };
    }
  } catch (err: any) {
    if (err.response.status === 404) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
    if (err.response.status === 500) {
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
