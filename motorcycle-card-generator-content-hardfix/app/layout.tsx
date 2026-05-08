import "./globals.css";

export const metadata = {
  title: "Motorrad Club Card Generator",
  description: "Sammelkarten Generator für Motorradclubs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="de"><body>{children}</body></html>;
}
