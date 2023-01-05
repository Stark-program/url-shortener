import axios from "axios";

const UrlPage = () => {
  return;
};

export async function getServerSideProps(context: any) {
  const { slug } = context.query;

  const res = await axios.get(`http://localhost:3000/api/getUrl`, {
    params: {
      urlId: slug,
    },
  });
  const url = res.data.url;

  return {
    redirect: {
      destination: url,
      permanent: false,
    },
  };
}

export default UrlPage;
