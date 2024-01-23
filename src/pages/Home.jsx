import React, { useEffect } from "react";
import { titleScroller } from "../utils/utils";
import { t } from "i18next";

export default function Home() {
  useEffect(() => titleScroller(t("home.title")), []);

  return (
    <div className="flex w-full h-screen bg-white text-black">
      {t("home.title")}
    </div>
  );
}
