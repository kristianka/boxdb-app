import i18next from "i18next";
import { Box } from "./types";

// check values are numbers and greater than 0
export const isValid = (
  heightNum: number,
  depthNum: number,
  lengthNum: number,
) => {
  if (isNaN(heightNum) || isNaN(depthNum) || isNaN(lengthNum)) {
    return false;
  }
  if (heightNum > 0 && depthNum > 0 && lengthNum > 0) {
    return true;
  }
  return false;
};

// toggle between languages
export const changeLanguage = () => {
  const lang = i18next.language === "en" ? "fi" : "en";
  i18next.changeLanguage(lang);
};

// Filter boxes based on search input
// updating the list as the user types. not case-sensitive
export const searchBoxes = (sortedBoxes: Box[], search: string) => {
  return sortedBoxes.filter((box) => {
    return (
      search === "" || box.comment?.toLowerCase().includes(search.toLowerCase())
    );
  });
};
