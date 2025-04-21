'use client';

import { useEffect } from "react";

export default function DarkModeScript() {
  useEffect(() => {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return null;
}
