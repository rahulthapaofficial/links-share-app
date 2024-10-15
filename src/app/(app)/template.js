import localFont from "next/font/local";
import "../globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import Image from "next/image";
import AppSidebar from "@/components/layout/AppSidebar";
import { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faLink } from "@fortawesome/free-solid-svg-icons";
import mongoose from "mongoose";
import { Page } from "@/models/Page";
import Link from "next/link";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Links Share - Your Single Link to Access Everything",
  description:
    "Consolidate Your Links, Social Profiles, Contact Information, and More on a Single Page",
};

export default async function AppTemplate({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  mongoose.connect(process.env.MONGODB_URI);
  const page = await Page.findOne({ owner: session?.user?.email });

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <main className="md:flex min-h-screen">
          <label
            htmlFor="navCb"
            className="md:hidden ml-8 mt-4 p-4 rounded-md bg-white shadow inline-flex items-center gap-2 cursor-pointer"
          >
            <FontAwesomeIcon icon={faBars} />
            <span>Open navigation</span>
          </label>
          <input id="navCb" type="checkbox" className="hidden" />
          <label
            htmlFor="navCb"
            className="hidden backdrop fixed inset-0 bg-black/80 z-10"
          ></label>
          <aside className="bg-white w-48 p-4 pt-6 shadow fixed md:static -left-48 top-0 bottom-0 z-20 transition-all">
            <div className="sticky top-0 pt-2">
              <div className="rounded-full overflow-hidden aspect-square w-24 mx-auto">
                <Image
                  src={session?.user?.image}
                  alt={"avatar"}
                  width={256}
                  height={256}
                />
              </div>
              {page && (
                <Link
                  target="_blank"
                  href={"/" + page.uri}
                  className="text-center mt-4 flex gap-1 items-center justify-center"
                >
                  <FontAwesomeIcon
                    size="lg"
                    icon={faLink}
                    className="text-blue-500"
                  />
                  <span className="text-xl text-gray-300">/</span>
                  <span>{page.uri}</span>
                </Link>
              )}
              <div className="text-center">
                <AppSidebar />
              </div>
            </div>
          </aside>
          <div className="grow">{children}</div>
        </main>
      </body>
    </html>
  );
}
