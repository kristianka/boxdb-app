import { Dropdown } from "flowbite-react";
import { ArrowLongDownIcon, ArrowLongUpIcon } from "@heroicons/react/16/solid";
import { SortType } from "../../types";
import { useTranslation } from "react-i18next";

interface props {
  sort: SortType;
  setSort: (sort: SortType) => void;
}

const Sort = ({ sort, setSort }: props) => {
  const { t } = useTranslation();

  return (
    <div className="m-1 inline-flex items-center rounded-lg border border-gray-300 bg-gray-50 px-5 py-2.5 text-center text-sm font-medium hover:bg-gray-300">
      <Dropdown className="" label={t("sort")} inline>
        <Dropdown.Item
          onClick={() => setSort("modifiedNewest")}
          icon={ArrowLongDownIcon}
          className={
            sort === "modifiedNewest" ? "rounded-md bg-gray-200" : "rounded-md"
          }
        >
          {t("modifiedNewest")}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => setSort("modifiedOldest")}
          icon={ArrowLongUpIcon}
          className={
            sort === "modifiedOldest" ? "rounded-md bg-gray-200" : "rounded-md"
          }
        >
          {t("modifiedOldest")}
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          onClick={() => setSort("addedNewest")}
          icon={ArrowLongDownIcon}
          className={
            sort === "addedNewest" ? "rounded-md bg-gray-200" : "rounded-md"
          }
        >
          {t("addedNewest")}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => setSort("addedOldest")}
          icon={ArrowLongUpIcon}
          className={
            sort === "addedOldest" ? "rounded-md bg-gray-200" : "rounded-md"
          }
        >
          {t("addedOldest")}
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          onClick={() => setSort("idDescending")}
          icon={ArrowLongDownIcon}
          className={
            sort === "idDescending" ? "rounded-md bg-gray-200" : "rounded-md"
          }
        >
          {t("idDescending")}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => setSort("idAscending")}
          icon={ArrowLongUpIcon}
          className={
            sort === "idAscending" ? "rounded-md bg-gray-200" : "rounded-md"
          }
        >
          {t("idAscending")}
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default Sort;
