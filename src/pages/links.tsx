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
      <div className="hidden justify-center md:flex">
        <div className="flex flex-1 flex-col justify-center">
          {userLinks.map(
            (link: { url: string; shortUrl: string }, index: number) => {
              return (
                <>
                  <div
                    className="flex w-2/3 flex-row justify-center space-x-4"
                    key={index}
                  >
                    <div className="... flex items-center overflow-hidden truncate  border-slate-500 text-left text-white">
                      {link.url}
                    </div>
                    <div className="flex items-end border border-slate-500 p-2 text-right text-white">
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
                    </div>
                  </div>
                </>
              );
            }
          )}
        </div>
      </div>
    );
  };

  const mobileScreenSizeTable = () => {
    return (
      <div className="md:hidden">
        {userLinks.map(
          (link: { url: string; shortUrl: string }, index: number) => {
            return (
              <>
                <div className=" w-2/3 justify-center space-y-2" key={index}>
                  <div className="... items-center overflow-hidden truncate  border-slate-500 text-left text-white">
                    {link.url}
                  </div>
                  <div className="items-center border border-slate-500 p-2 text-white">
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
                  </div>
                </div>
              </>
            );
          }
        )}
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
          <main className="w-full flex-col items-center justify-center ">
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
