"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "@/components/buttons/LogoutButton";
import { usePathname } from "next/navigation";

export default function AppSidebar() {
  const path = usePathname();
  return (
    <nav className="inline-flex mx-auto flex-col text-center mt-12 gap-6 text-gray-500">
      <Link
        href={"/account"}
        className={"flex gap-4 " + (path === "/account" ? "text-blue-500" : "")}
      >
        <FontAwesomeIcon
          fixedWidth={true}
          icon={faFileLines}
          className="w-6 h-6"
        />
        <span className="">My Page</span>
      </Link>
      <Link
        href={"/analytics"}
        className={
          "flex gap-4 " + (path === "/analytics" ? "text-blue-500" : "")
        }
      >
        <FontAwesomeIcon icon={faChartLine} className="w-6 h-6" />
        <span className="">Analytics</span>
      </Link>
      <LogoutButton
        className={"flex gap-4 items-center text-gray-500"}
        iconLeft={true}
        iconClasses="w-6 h-6"
      />
      {/* <Link
        href={"/"}
        className="flex gap-2 items-center text-xs text-gray-500 border-t pt-4"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3" />
        <span>Back yo website</span>
      </Link> */}
    </nav>
  );
}
