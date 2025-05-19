import { ReactNode } from "react";
import "./globals.css";

import { Roboto } from 'next/font/google'
 
const roboto = Roboto({subsets: ["cyrillic"]});

export default function RootLayout({ children }: {children: ReactNode}) {
  return (
    <html lang="en" className={roboto.className}>
       <head></head>
      <body>
        <div className="layoutDiv">
          {children}
        </div>
      </body>
    </html>
  );
}
