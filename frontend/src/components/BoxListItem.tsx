import { Box } from "../types";

interface props {
  box: Box;
  setSelectedBox: (box: Box) => void;
}

const BoxListItem = ({ box, setSelectedBox }: props) => {
  const setSelected = () => {
    console.log("setSelected");
    setSelectedBox(box);
  };

  return (
    <button
      data-testid="BoxListItem"
      onClick={setSelected}
      className="mb-2 w-full rounded-md bg-white p-2 text-left hover:bg-gray-100"
      title={box.comment ? box.comment : "No comment"}
    >
      <div className="grid grid-cols-4 md:grid-cols-5">
        <p className="truncate">{box.id}</p>
        <p className="truncate">
          {box.width} x {box.height} x {box.depth}
        </p>
        <p className="truncate">{new Date(box.createdAt).toLocaleString()}</p>
        <div className="hidden md:block">
          {box.updatedAt !== box.createdAt ? (
            <p className="truncate">
              {new Date(box.updatedAt).toLocaleString()}
            </p>
          ) : (
            <p className="truncate italic text-gray-600">Not modified</p>
          )}
        </div>
        {box.comment ? (
          <p className="truncate">{box.comment}</p>
        ) : (
          <p className="truncate italic text-gray-600">No comment</p>
        )}
      </div>
    </button>
  );
};

export default BoxListItem;
