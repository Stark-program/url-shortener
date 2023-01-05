const Alerurl = () => {
  return (
    <div
      className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
      role="alert"
    >
      <h1 className="text-red text-3xl font-bold ">Error!</h1>
      <span className="text-red block text-3xl sm:inline">
        Please enter valid URL
      </span>
    </div>
  );
};

export default Alerurl;
