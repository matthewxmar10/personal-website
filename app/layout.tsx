import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import CursorFollower from "@/components/layout/CursorFollower";
import { ThemeProvider } from "@/context/ThemeContext";
import { EmeraldProvider } from "@/context/EmeraldContext";
import ChaosEmeraldSystem from "@/components/ui/ChaosEmeraldSystem";
import EmeraldSuccessModal from "@/components/ui/EmeraldSuccessModal";
import EmeraldHUD from "@/components/ui/EmeraldHUD";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Matthew",
  description: "Personal website — actor, musician, gamer, creator, builder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Anti-flash: set data-theme before React hydrates to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <EmeraldProvider>
            <a href="#main-content" className="skip-to-content">Skip to content</a>
            <CursorFollower />
            <Navigation />
            {/* Chaos Emerald Easter egg — page gem + fly animation */}
            <ChaosEmeraldSystem />
            {/* Success modal when all 7 are found */}
            <EmeraldSuccessModal />
            {/* Floating bottom-centre HUD — gem progress + reset/reopen controls */}
            <EmeraldHUD />
            <main id="main-content" className="page-content">
              {children}
            </main>
            <Footer />
          </EmeraldProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
