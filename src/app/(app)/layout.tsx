export const metadata = {
  title: "Links Share - Your Single Link to Access Everything",
  description:
    "Consolidate Your Links, Social Profiles, Contact Information, and More on a Single Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
