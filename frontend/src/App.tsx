/* eslint-disable react-hooks/exhaustive-deps */
// prevents infinite loops with useEffects
import "./App.css";
import "./i18n/config";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import PaginationCount from "./components/Buttons/PaginationCount";
import axios from "axios";

import { Box, SortType } from "./types";
import Header from "./components/Header";
import Search from "./components/Search";
import BoxDetails from "./components/BoxDetails";
import BoxList from "./components/BoxList/BoxList";
import Sort from "./components/Buttons/Sort";
import Refresh from "./components/Buttons/Refresh";
import NewBox from "./components/Buttons/NewBox";
import { sortBoxes } from "./components/Buttons/sortLogic";
import { getBoxes } from "./services/boxes";
import ErrorMessage from "./components/ErrorMessage";
import { searchBoxes } from "./misc";
import InfoMessage from "./components/InfoMessage";

const address = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [selectedBox, setSelectedBox] = useState<Box>();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortType>("modifiedNewest");

  const [error, setError] = useState<boolean>(false);
  const [pagination, setPagination] = useState(10);

  const { t } = useTranslation();

  const fetchBoxes = async () => {
    try {
      const boxes = await getBoxes();
      setBoxes(boxes);
    } catch (error) {
      toast.error(t("couldntFetchBoxes"));
      if (axios.isAxiosError(error)) toast.info(error?.response?.data.error);
      setError(true);
    }
  };

  useEffect(() => {
    if (!address) {
      setError(true);
    }
    fetchBoxes();
  }, []);

  // sort boxes by user choice. default is modified newest.
  // send empty array if boxes is undefined
  const sortedBoxes = sortBoxes(boxes ?? [], sort);

  // filter boxes based on search input
  const filteredBoxes = searchBoxes(sortedBoxes, search);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <div className="m-3 mt-5 grid sm:grid-cols-1 md:grid-cols-5">
        <div className="m-3 md:col-span-3">
          <div className="mb-3 flex flex-wrap items-center justify-between">
            <h2 className="mb-5 text-xl">{t("boxes")}</h2>
            <div className="flex">
              <Search setSearch={setSearch} />
              <PaginationCount
                pagination={pagination}
                setPagination={setPagination}
              />
              <Sort sort={sort} setSort={setSort} />
              <NewBox boxes={boxes} setBoxes={setBoxes} />
              <Refresh fetchBoxes={fetchBoxes} />
            </div>
          </div>
          {error ? (
            <div>
              <ErrorMessage
                title={t("error")}
                description={t("couldntFetchBoxes")}
              />
              <div className="mt-3">
                <InfoMessage title={t("info")} description={t("infoTip")} />
              </div>
            </div>
          ) : (
            <BoxList
              pagination={pagination}
              filteredBoxes={filteredBoxes}
              selectedBox={selectedBox}
              setSelectedBox={setSelectedBox}
            />
          )}
        </div>
        <div className="m-3 md:order-2 md:col-span-2">
          <h2 className="mb-5 text-xl">{t("detailedInfo")}</h2>
          {!selectedBox ? (
            <p className="mt-10 text-center italic text-gray-600">
              {t("detailedInfoTip")}
            </p>
          ) : (
            <BoxDetails boxes={boxes} setBoxes={setBoxes} box={selectedBox} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
