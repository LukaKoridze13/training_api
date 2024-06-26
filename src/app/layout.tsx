import "./global.css";
import Providers from "./providers";
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning={true} className="dark">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <title>Training API</title>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
