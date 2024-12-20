import { AuthProvider } from "@propelauth/nextjs/client";

import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <AuthProvider authUrl={process.env.NEXT_PUBLIC_AUTH_URL!}>
        <body className={`min-h-screen flex flex-col antialiased`}>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
