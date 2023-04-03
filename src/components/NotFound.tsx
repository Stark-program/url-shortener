import Link from "next/link";

const NotFound = (props: Props) => {
  return (
    <div className="-mt-28 flex min-h-screen flex-col items-center justify-center py-2 text-center">
      <h1 className="text-9xl font-bold text-red-500">{props.status}</h1>
      <h2 className="text-6xl font-bold">{props.error}</h2>
      {props.is404 && (
        <h4 className="mt-1 text-xl font-bold">
          Want to create your own short link?{" "}
          <Link href="/" className="text-xl font-bold text-blue-500">
            Click here
          </Link>
        </h4>
      )}
    </div>
  );
};

interface Props {
  status?: number;
  error?: string;
  is404?: boolean;
}

export default NotFound;
