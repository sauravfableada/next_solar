import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BHARAT SOLAR | Powering India's Future with Clean Energy",
  description:
    "India's premier solar energy corporation delivering Tier-1 solar modules, EPC solutions, utility-scale solar farms, and residential solar power systems.",
  keywords: [
    "Solar Energy India",
    "Tata Power Solar Inspiration",
    "Waaree Solar",
    "Solar EPC India",
    "TOPCon Solar Panels",
    "Mono PERC",
    "Solar Farms India",
    "Clean Energy India",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jost.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-white text-[#182521] font-sans antialiased selection:bg-[#F4B942] selection:text-[#073D32]"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
