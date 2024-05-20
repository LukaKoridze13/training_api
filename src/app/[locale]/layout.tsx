import Header from "@/components/header/Header";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import localFont from "next/font/local";
import { Inter } from "next/font/google";

export const kaFont = localFont({ src: "../../assets/fonts/ka.ttf" });
export const enFont = Inter({ subsets: ["latin"] });
export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  const messages = useMessages();
  const locale = useLocale();
  return (
    <NextIntlClientProvider messages={messages}>
      <main className={locale === "en" ? enFont.className : kaFont.className}>
        <Header />
        {children}
      </main>
    </NextIntlClientProvider>
  );
}
