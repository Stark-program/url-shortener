import NotFound from "../components/NotFound";

const Error = () => {
  return <NotFound status={500} error="Internal Server Error" />;
};

export default Error;
