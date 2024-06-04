import { Spinner } from "flowbite-react";
import { useState } from "react";

interface props {
  fetchBoxes: () => void;
}
const Refresh = ({ fetchBoxes }: props) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleClick = async () => {
    setIsFetching(true);
    await fetchBoxes();
    setTimeout(() => {
      setIsFetching(false);
    }, 100);
  };
  return (
    <button
      disabled={isFetching}
      onClick={handleClick}
      type="button"
      title="Refresh list"
      className="m-1 inline-flex items-center rounded-lg
      border border-gray-300 bg-gray-50 px-5 py-2.5 text-center text-sm font-medium hover:bg-gray-300 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
    >
      {isFetching ? (
        <Spinner size="md" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="size-6"
        >
          <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      )}
    </button>
  );
};

export default Refresh;
