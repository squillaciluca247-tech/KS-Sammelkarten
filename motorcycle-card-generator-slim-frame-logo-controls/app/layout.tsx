import "./globals.css";

export const metadata = {
  title: "Motorrad Club Card Generator",
  description: "Canvas-basierter Sammelkarten Generator",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="de"><body>{children}</body></html>;
}
