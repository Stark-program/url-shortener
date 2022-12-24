import { useState } from "react";
import axios from "axios";
import Alerurl from "./AlertUrl";

const AddUrl = () => {
  const [isUrl, setIsUrl] = useState("");
  const [isInvalidUrl, setIsInvalidUrl] = useState(false);

  const checkValidUrl = (urlString: string) => {
    var inputElement = document.createElement("input");
    inputElement.type = "url";
    inputElement.value = urlString;

    if (!inputElement.checkValidity()) {
      return false;
    } else {
      return true;
    }
  };

  const handleSumbit = async () => {
    console.log(checkValidUrl(isUrl));
    if (!checkValidUrl(isUrl)) {
      setIsInvalidUrl(true);
    }
    // const res = await axios.post("http://localhost:3000/api/shorten", {
    //   url: isUrl,
    // });
    // console.log(res);
  };

  return (
    <div className="container flex flex-col items-center  gap-12 px-4 py-16 ">
      <h1 className="text-6xl font-bold text-white">URL Shortener</h1>
      <input
        className="w-full max-w-md rounded-md border-2 border-white bg-transparent p-4 text-2xl text-white outline-none focus:border-[#ff00ff] focus:ring-2 focus:ring-[#ff00ff] focus:ring-opacity-50"
        placeholder="Enter your URL here"
        onChange={(e) => setIsUrl(e.target.value)}
        value={isUrl}
        type="url"
      />
      <button
        className="w-full max-w-md rounded-md bg-[#ff00ff] p-4 text-2xl text-white outline-none focus:ring-2 focus:ring-[#FFFFFF] focus:ring-opacity-50"
        onClick={() => {
          handleSumbit();
        }}
      >
        Submit
      </button>
      {isInvalidUrl ? <Alerurl /> : null}
    </div>
  );
};

export default AddUrl;
