import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const User = () => {
  const { data: session } = useSession();

  const signedIn = () => {
    return (
      <>
        <div className="flex w-full flex-row justify-end pr-4 pt-2 text-xl text-white lg:pt-12 lg:pr-12">
          Signed in as {session?.user?.name}
        </div>
        <div className="flex w-full flex-row justify-end pr-4 pt-2 text-xl text-white lg:pr-12">
          <Link href="/links">Your Links</Link>
        </div>
        <div className="flex w-full flex-row justify-end pr-4 pt-2 text-xl text-white lg:pr-12">
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </>
    );
  };

  const signedOut = () => {
    return (
      <div className="flex w-full justify-end pr-4 pt-2 text-xl text-white lg:pr-12 lg:pt-12">
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    );
  };

  return <>{session ? signedIn() : signedOut()}</>;
};

export default User;
