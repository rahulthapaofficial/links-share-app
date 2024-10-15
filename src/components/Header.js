import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import LogoutButton from "@/components/buttons/LogoutButton";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="bg-white border-b py-4">
      <div className="max-w-6xl flex justify-between mx-auto px-4">
        <div className="flex items-center gap-6">
          <Link href={"/"} className="flex items-center gap-2 text-blue-500">
            <FontAwesomeIcon icon={faLink} className="text-blue-500" />
            <span className="font-bold">Links Share</span>
          </Link>
          <nav className="flex items-center gap-4 text-slate-500 text-sm">
            <Link href={"/"}>About</Link>
            <Link href={"/"}>Contact</Link>
          </nav>
        </div>
        <nav className="flex items-center gap-4 text-slate-500">
          {!!session && (
            <>
              <Link href={"/account"}>Hello, {session.user.name}</Link>
              <LogoutButton />
            </>
          )}
          {!session && (
            <>
              <Link href={"/login"}>Sign In</Link>
              <Link href={"/register"}>Create Account</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
