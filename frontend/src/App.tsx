import "./App.css";
import { useEffect, useState } from "react";
import { Box, SortType } from "./types";
import Header from "./components/Header";
import Search from "./components/Search";
import BoxDetails from "./components/BoxDetails";
import BoxList from "./components/BoxList";
import Sort from "./components/Buttons/Sort";
import Refresh from "./components/Buttons/Refresh";
import NewBox from "./components/Buttons/NewBox";
import { sortBoxes } from "./components/Buttons/sortLogic";
import PaginationCount from "./components/Buttons/PaginationCount";
import { getBoxes } from "./services/boxes";
import ErrorMessage from "./components/ErrorMessage";
import { toast } from "react-toastify";
import "./i18n/config";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const address = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [boxes, setBoxes] = useState<Box[]>();
  const [selectedBox, setSelectedBox] = useState<Box>();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortType>("modifiedNewest");

  const [error, setError] = useState<boolean>(false);
  const [pagination, setPagination] = useState(10);

  const { t } = useTranslation();

  const changeLang = () => {
    const lang = i18next.language === "en" ? "fi" : "en";
    i18next.changeLanguage(lang);
  };

  const fetchBoxes = async () => {
    try {
      const boxes = await getBoxes();
      console.log(boxes);
      setBoxes(boxes);
    } catch (error) {
      toast.error(
        "Couldn't fetch boxes. Please check your .env and make sure the backend is running.",
      );
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

  // Filter boxes based on search input
  // updating the list as the user types. not case-sensitive
  const filteredBoxes = sortedBoxes.filter((box) => {
    return (
      search === "" || box.comment?.toLowerCase().includes(search.toLowerCase())
    );
  });

  console.log(boxes);
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <button onClick={changeLang}>change lang</button>
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
              <NewBox />
              <Refresh fetchBoxes={fetchBoxes} />
            </div>
          </div>
          {error ? (
            <ErrorMessage
              title="Error!"
              description="Backend URL not found. Please check your .env file."
            />
          ) : (
            <BoxList
              pagination={pagination}
              setSelectedBox={setSelectedBox}
              filteredBoxes={filteredBoxes}
            />
          )}
        </div>
        <div className="m-3 md:order-2 md:col-span-2">
          <h2 className="mb-5 text-xl">Detailed info</h2>
          {!selectedBox ? (
            <p className="mt-10 text-center italic text-gray-600">
              Click on a box to edit its info
            </p>
          ) : (
            <BoxDetails box={selectedBox} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
