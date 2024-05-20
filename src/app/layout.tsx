import "./global.css";
import Providers from "./providers";
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning={true} className='dark'>
      <head></head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
