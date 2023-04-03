import { useState } from "react";
import axios from "axios";
import Alerurl from "./AlertUrl";
import { useSession } from "next-auth/react";

const AddUrl = () => {
  const [isUrl, setIsUrl] = useState("");
  const [isInvalidUrl, setIsInvalidUrl] = useState(false);
  const [isShortUrl, setIsShortUrl] = useState("");
  const [response, setResponse] = useState(false);

  const port = process.env.PORT || 3000;

  const { data: session } = useSession();

  const checkValidUrl = (urlString: string) => {
    const inputElement = document.createElement("input");
    inputElement.type = "url";
    inputElement.value = urlString;

    if (!inputElement.checkValidity()) {
      return false;
    } else {
      return true;
    }
  };

  const handleSumbit = async () => {
    setIsInvalidUrl(false);

    if (!checkValidUrl(isUrl)) {
      setIsInvalidUrl(true);
    } else if (session) {
      const res = await axios.post(`http://localhost:${port}/api/shorten`, {
        url: isUrl,
        user: session?.user?.email,
      });
      const shortUrl = res.data.shortUrl;
      if (shortUrl) {
        setIsShortUrl(shortUrl);
        setResponse(true);
      }
    } else {
      const res = await axios.post(`http://localhost:${port}/api/shorten`, {
        url: isUrl,
      });
      const shortUrl = res.data.shortUrl;
      if (shortUrl) {
        setIsShortUrl(shortUrl);
        setResponse(true);
      }
    }
  };

  const shortUrl = () => {
    return <h1 className="text-4xl font-bold text-white">{isShortUrl}</h1>;
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
      {response ? shortUrl() : null}
    </div>
  );
};

export default AddUrl;
