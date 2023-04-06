import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { prisma } from "../server/db/client";
import { HiOutlineClipboard } from "react-icons/hi";
import { useEffect, useState } from "react";
import Link from "next/link";

function Links({
  session,
  userLinks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [haveData, setHaveData] = useState(false);

  useEffect(() => {
    setHaveData(true);
  }, []);

  const largeScreenSizeTable = () => {
    return (
      <div className="hidden md:block">
        <table className=" border-separate border-spacing-2 border border-slate-200 text-white md:max-w-md lg:max-w-xl">
          <thead>
            <tr>
              <th className=" border border-slate-400">Original Url</th>
              <th className=" border border-slate-400">Short Url</th>
            </tr>
          </thead>
          <tbody></tbody>
          {userLinks.map(
            (link: { url: string; shortUrl: string }, index: number) => {
              return (
                <>
                  <tr key={index}>
                    <td className=" border border-slate-500 p-4">{link.url}</td>
                    <td className=" flex items-center border border-slate-500 p-4">
                      {link.shortUrl}
                      <span className="pl-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(link.shortUrl);
                            alert("Link copied to clipboard!");
                          }}
                        >
                          <HiOutlineClipboard />
                        </button>
                      </span>
                    </td>
                  </tr>
                </>
              );
            }
          )}
        </table>
      </div>
    );
  };

  const mobileScreenSizeTable = () => {
    return (
      <div className="md:hidden">
        <table className=" border-separate border-spacing-2 border border-slate-200 text-white md:max-w-md lg:max-w-xl">
          {userLinks.map(
            (link: { url: string; shortUrl: string }, index: number) => {
              return (
                <>
                  <tr key={index} className="w-1/3">
                    <td className=" border border-slate-500 p-4">{link.url}</td>
                  </tr>
                  <tr>
                    <td className=" flex items-center border border-slate-500 p-4">
                      {link.shortUrl}
                      <span className="pl-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(link.shortUrl);
                            alert("Link copied to clipboard!");
                          }}
                        >
                          <HiOutlineClipboard />
                        </button>
                      </span>
                    </td>
                  </tr>
                </>
              );
            }
          )}
        </table>
      </div>
    );
  };
  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      {haveData ? (
        <div className="">
          <div className="pl-4 pt-2 lg:pl-12 lg:pt-6">
            <Link href="/" className="text-xl text-white">
              Home
            </Link>
          </div>
          <main className="flex w-full flex-col items-center justify-center ">
            <h1 className="py-12 text-xl text-white">
              {`${session?.user?.name}'s links`}
            </h1>

            {largeScreenSizeTable()}
            {mobileScreenSizeTable()}
          </main>
        </div>
      ) : null}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const email = session.user?.email;
  const userLinks = await prisma.link.findMany({
    where: {
      user: email,
    },
  });
  return {
    props: {
      session,
      userLinks,
    },
  };
};

export default Links;
