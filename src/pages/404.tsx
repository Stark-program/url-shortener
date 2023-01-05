import NotFound from "../../components/NotFound";

const Error = () => {
  return <NotFound status={404} error="URL not found" />;
};

export default Error;
