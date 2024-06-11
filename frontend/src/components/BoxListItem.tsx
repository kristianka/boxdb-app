import { useTranslation } from "react-i18next";
import { Box } from "../types";

interface props {
  box: Box;
  selectedBox: Box | undefined;
  setSelectedBox: (box: Box) => void;
}

const BoxListItem = ({ box, selectedBox, setSelectedBox }: props) => {
  const { t } = useTranslation();

  const setSelected = () => {
    setSelectedBox(box);
  };

  const isSelected = selectedBox?.id === box.id;

  return (
    <button
      data-testid="BoxListItem"
      onClick={setSelected}
      className={`mb-2 w-full rounded-md p-2 text-left ${
        isSelected ? "bg-gray-200" : "bg-white hover:bg-gray-100"
      }`}
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
            <p className="truncate italic text-gray-600">{t("notModified")}</p>
          )}
        </div>
        {box.comment ? (
          <p className="truncate">{box.comment}</p>
        ) : (
          <p className="truncate italic text-gray-600">{t("noComment")}</p>
        )}
      </div>
    </button>
  );
};

export default BoxListItem;
