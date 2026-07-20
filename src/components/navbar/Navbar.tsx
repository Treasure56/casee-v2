import { paths } from "@/utils/paths";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import ThemeToggle from "../ThemeToggle";
import { getSessionUser } from "@/lib/auth";
import { logoutAction } from "@/actions/auth";

export default async function Navbar() {
  const user = await getSessionUser();

  return (
    <header className="h-16 w-full sticky top-0 bg-background/90 z-30 flex items-center app-container justify-between py-2 border-b border-border backdrop-blur-sm gap-4">
      <div className="flex gap-4 h-full items-center text-brand-primary">
        <Link href={paths.home} className="text-2xl font-bold text-brand-primary">
          Ca<span className="text-brand-secondary">see</span>
        </Link>
      </div>
      <nav className="flex gap-4 h-full items-center">
        <div className="flex gap-4 border-r border-border pr-4 items-center max-md:hidden text-sm">
          {user ? (
            <>
              <span className="text-muted-foreground font-medium">
                Hello, {user.name}
              </span>
              {user.email === process.env.ADMIN_EMAIL && (
                <Link href={paths.dashboard} className="btn !px-2">
                  Dashboard
                </Link>
              )}
              <form action={logoutAction}>
                <button type="submit" className="btn !px-2 text-destructive font-medium cursor-pointer">
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href={paths.login} className="btn !px-2">
                Login
              </Link>
              <Link href={paths.register} className="btn !px-2">
                Register
              </Link>
            </>
          )}
        </div>
        <ThemeToggle />
        <Link href={paths.design} className="btn btn-primary !px-6 !py-3 md:text-sm text-xs truncate ">
          Create Case <LuArrowUpRight />
        </Link>
      </nav>
    </header>
  );
}
