"use client";
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import { Link } from "@/navigation";
import { Inter } from "next/font/google";
const enFont = Inter({ subsets: ["latin"] });
export default function Header() {
  const t = useTranslations("navigation");
  return (
    <Navbar shouldHideOnScroll className="bg-zinc-950">
      <NavbarBrand>
        <Link href="/" className="flex items-center gap-3">
          <Image className="w-8" src={Logo} alt="Luka Koridze" />
          <p className={`text-lg ${enFont.className}`}>Training API</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/api-docs">{t("docs")}</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <LocaleSwitcher />
      </NavbarContent>
    </Navbar>
  );
}
