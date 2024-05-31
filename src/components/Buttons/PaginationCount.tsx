import { Dropdown } from "flowbite-react";

interface props {
  pagination: number;
  setPagination: (pagination: number) => void;
}

const PaginationCount = ({ pagination, setPagination }: props) => {
  return (
    <div className="m-1 inline-flex items-center rounded-lg border border-gray-300 bg-gray-50 px-5 py-2.5 text-center text-sm font-medium hover:bg-gray-300">
      <Dropdown className="" label="Show" inline>
        <Dropdown.Item
          onClick={() => setPagination(10)}
          className={pagination === 10 ? "bg-gray-200" : ""}
        >
          10 per page
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => setPagination(25)}
          className={pagination === 25 ? "bg-gray-200" : ""}
        >
          25 per page
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => setPagination(50)}
          className={pagination === 50 ? "bg-gray-200" : ""}
        >
          50 per page
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => setPagination(100)}
          className={pagination === 100 ? "bg-gray-200" : ""}
        >
          100 per page
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default PaginationCount;
