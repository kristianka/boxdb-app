import { changeLanguage } from "../../misc";
import { useState } from "react";
import "flag-icons/css/flag-icons.min.css";
import { useTranslation } from "react-i18next";
import { Dropdown } from "flowbite-react";

const ChangeLanguageDropdown = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.language === "en" ? "gb" : i18n.language,
  );

  // english flag is GB, little hacky
  const handleLanguageChange = (language: string) => {
    if (language === "en") {
      changeLanguage(language);
      setSelectedLanguage("gb");
      return;
    }
    changeLanguage(language);
    setSelectedLanguage(language);
  };

  return (
    <div className="m-1 inline-flex items-center rounded-lg border border-gray-300 bg-gray-50 px-5 py-2.5 text-center text-sm font-medium hover:bg-gray-300">
      <span className={`fi mr-2 fi-${selectedLanguage}`}></span>
      <Dropdown
        className=""
        label={
          <span
            data-testid="changeLanguageDropdown"
            className="hidden sm:block"
          >
            {t("language")}
          </span>
        }
        inline
      >
        <Dropdown.Item
          className="rounded-md"
          data-testid="changeLanguageDropdownEn"
          onClick={() => handleLanguageChange("en")}
        >
          <span className="fi fi-gb mr-2"></span>
          English
        </Dropdown.Item>
        <Dropdown.Item
          className="rounded-md"
          data-testid="changeLanguageDropdownFi"
          onClick={() => handleLanguageChange("fi")}
        >
          <span className="fi fi-fi mr-2"></span>
          Finnish
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default ChangeLanguageDropdown;
