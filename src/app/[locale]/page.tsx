"use client";
import PostmanButton from "@/components/PostmanButton";
import { Link } from "@/navigation";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";

const HomePage = () => {
  const t = useTranslations();

  return (
    <div className="flex min-h-[calc(100dvh-64px)] justify-center items-center gap-8 bg-zinc-900">
      <div className="mx-16">
        <h1 className="text-center font-medium text-5xl">Training API</h1>
        <p className="mt-12 text-center max-w-[1000px] text-lg font-medium">{t("hero.docs")}</p>
        <div className="w-fit mx-auto mt-20 flex gap-12 items-center">
          <Link href="/api-docs">
            <Button className={`px-3 h-[38.4px] flex font-semibold items-center justify-center pt-1 bg-slate-100 text-zinc-900 rounded text-sm uppercase ka_up`}>{t("hero.button")}</Button>
          </Link>
          <PostmanButton />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
