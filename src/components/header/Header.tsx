"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import { enFont } from "@/app/[locale]/layout";
import { Link } from "@/navigation";

export default function Header() {
  const t = useTranslations("navigation");
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <Image className='w-8 mr-3' src={Logo} alt='Luka Koridze' />
        <p className={`text-lg ${enFont.className}`}>Training API</p>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Link href='/'>{t("docs")}</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <LocaleSwitcher />
      </NavbarContent>
    </Navbar>
  );
}
