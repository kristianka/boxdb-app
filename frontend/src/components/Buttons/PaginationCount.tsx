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
    <div className="m-1 inline-flex items-center rounded-lg border border-gray-300 bg-gray-50 px-5 py-2.5 text-center text-sm font-medium hover:bg-gray-300">
      <Dropdown className="" label={t("show")} inline>
        <Dropdown.Item
          onClick={() => setPagination(10)}
          className={pagination === 10 ? "bg-gray-200" : ""}
        >
          10 {t("perPage")}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => setPagination(25)}
          className={pagination === 25 ? "bg-gray-200" : ""}
        >
          25 {t("perPage")}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => setPagination(50)}
          className={pagination === 50 ? "bg-gray-200" : ""}
        >
          50 {t("perPage")}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => setPagination(100)}
          className={pagination === 100 ? "bg-gray-200" : ""}
        >
          100 {t("perPage")}
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default PaginationCount;
