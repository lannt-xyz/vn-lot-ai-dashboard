import { ThemeProvider } from '@mui/material/styles';
import type { Metadata } from "next";
import theme from '../theme';
import DatePickerWrapper from './components/forms/DatePickerWrapper';
import SideNav from './components/navigation/SideNav';
import CircularProgress from './components/progess/CircularProgress';
import "./globals.css";
import { StoreProvider } from "./StoreProvider";
import DarkModeScript from './DarkModeScript';

export const metadata: Metadata = {
  title: "Vnlot Dashboard",
  description: "Vnlot Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const isDarkMode = false;

  return (
    <html lang="en" className={isDarkMode ? "dark" : ""}>
      <head>
        {/* Add Google Fonts link */}
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist&family=Geist+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`antialiased`}>
        <DarkModeScript />
        <StoreProvider>
          <ThemeProvider theme={theme}>
            <div className='p-4'>
              <div className="flex flex-row w-full gap-1">
                <div className='flex flex-row items-center'>
                  <SideNav />
                </div>
                <div className='flex flex-row items-center pl-6'>
                  <DatePickerWrapper />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                {children}
              </div>
            </div>
            <CircularProgress />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
