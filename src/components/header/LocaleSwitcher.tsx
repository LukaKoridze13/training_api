import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import Image from "next/image";
import Geo from "@/assets/images/georgia.png";
import Uk from "@/assets/images/united-kingdom.png";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function toggleLanguage() {
    const nextLocale = locale === "en" ? "ka" : "en";
    // @ts-ignore
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <Image
      onClick={toggleLanguage}
      className='w-8 cursor-pointer'
      src={locale === "en" ? Geo : Uk}
      alt={locale === "en" ? "Georgian Flag" : "United Kingdom Flag"}
    />
  );
}
