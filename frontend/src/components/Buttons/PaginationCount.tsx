import { Dropdown } from "flowbite-react";
import { useTranslation } from "react-i18next";

interface props {
  pagination: number;
  setPagination: (pagination: number) => void;
}

const PaginationCount = ({ pagination, setPagination }: props) => {
  const { t } = useTranslation();

  // set pagination. 10, 25, 50, 100
  return (
    <div className="py-1.25 m-1 inline-flex items-center rounded-lg border border-gray-300 bg-gray-50 px-2.5 text-center text-sm font-medium hover:bg-gray-300 sm:px-5 sm:py-2.5">
      <Dropdown className="" label={t("show")} inline>
        <Dropdown.Item
          onClick={() => setPagination(10)}
          className={
            pagination === 10 ? "rounded-md bg-gray-200" : "rounded-md"
          }
        >
          10 {t("perPage")}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => setPagination(25)}
          className={
            pagination === 25 ? "rounded-md bg-gray-200" : "rounded-md"
          }
        >
          25 {t("perPage")}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => setPagination(50)}
          className={
            pagination === 50 ? "rounded-md bg-gray-200" : "rounded-md"
          }
        >
          50 {t("perPage")}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => setPagination(100)}
          className={
            pagination === 100 ? "rounded-md bg-gray-200" : "rounded-md"
          }
        >
          100 {t("perPage")}
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default PaginationCount;
