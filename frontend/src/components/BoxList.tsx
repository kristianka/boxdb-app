import { Box } from "../types";
import { Pagination } from "flowbite-react";
import BoxListHeaders from "./BoxListHeaders";
import BoxListItem from "./BoxListItem";
import { useState } from "react";

interface props {
  pagination: number;
  filteredBoxes: Box[];
  setSelectedBox: (box: Box) => void;
}

const BoxList = ({ pagination, filteredBoxes, setSelectedBox }: props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = pagination;

  const onPageChange = (page: number) => setCurrentPage(page);

  const displayedBoxes = filteredBoxes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div>
      <BoxListHeaders />
      {filteredBoxes.length === 0 ? (
        <div className="mt-4 text-center text-gray-500">
          No boxes found. Is the backend running?
        </div>
      ) : (
        <>
          {displayedBoxes.map((box) => (
            <BoxListItem
              key={box.id}
              box={box}
              setSelectedBox={setSelectedBox}
            />
          ))}
          <div className="mt-4 flex overflow-x-auto sm:justify-center">
            <Pagination
              data-testid="pagination"
              currentPage={currentPage}
              totalPages={Math.ceil(filteredBoxes.length / itemsPerPage)}
              onPageChange={onPageChange}
              showIcons
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BoxList;
