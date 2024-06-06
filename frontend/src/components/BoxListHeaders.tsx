import { useTranslation } from "react-i18next";

const BoxListHeaders = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-3 grid grid-cols-4 rounded-md bg-white p-5 md:grid-cols-5 md:p-3">
      <span>ID</span>
      <span title={t("widthHeightDepth")}>
        {t("widthHeightDepthAbbreviation")}
      </span>
      <span>{t("createdAt")}</span>
      <span className="hidden md:block">{t("updatedAt")}</span>
      <span>{t("comment")}</span>
    </div>
  );
};

export default BoxListHeaders;
