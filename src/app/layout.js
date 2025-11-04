import "./globals.css";

export const metadata = {
  title: "SpendWise",
  description: "Web application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
