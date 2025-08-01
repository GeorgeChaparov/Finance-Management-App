import { ReactNode } from "react";
import "./globals.css";

import { Roboto } from 'next/font/google'
import { ConfirmProvider } from "../components/basic/popups/confirm-popup/ConfirmPopup";
 
const roboto = Roboto({subsets: ["cyrillic"]});

export default function RootLayout({ children }: {children: ReactNode}) {
  return (
    <html lang="en" className={roboto.className}>
       <head></head>
      <body>
        <div className="layoutDiv">
          <ConfirmProvider>
            {children}
          </ConfirmProvider>
        </div>
      </body>
    </html>
  );
}
