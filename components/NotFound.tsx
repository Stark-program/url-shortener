const NotFound = (props: Props) => {
  return (
    <div className="-mt-28 flex min-h-screen flex-col items-center justify-center py-2 text-center">
      <h1 className="text-9xl font-bold text-red-500">{props.status}</h1>
      <h2 className="text-6xl font-bold">{props.error}</h2>
    </div>
  );
};

interface Props {
  status?: number;
  error?: string;
}

export default NotFound;
